"use client";
import ClientLayout from "@/app/components/clientlayout";
import { useAuth } from "@/app/context/authContext";
import ProfileStatBox from "@/app/components/profile/profilestatbox";
import ProfileCard from "@/app/components/profile/profilecard";
import supabase from "@/app/lib/supabaseClient";
import { useState, useEffect } from "react";
import { formatDistanceToNow, isToday } from "date-fns";

export default function ProfilePage() {
  const [watchedCount, setWatchedCount] = useState<number>(0);
  const [toWatchCount, setToWatchCount] = useState<number>(0);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  // const [tbdCount, setTbdCount] = useState<number>(0);
  type WatchedMovie = {
    id: string;
    user_id: string;
    title: string;
    watched_at: string;
  };

  const [lastActivity, setLastActivity] = useState<WatchedMovie | null>(null);

  const { user, userData } = useAuth();

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return;

      const { data: watchedData } = await supabase
        .from("watched_movies")
        .select("*")
        .eq("user_id", user.id);
      setWatchedCount(watchedData ? watchedData.length : 0);

      const { data: toWatchData } = await supabase
        .from("movies_to_watch")
        .select("*")
        .eq("user_id", user.id);
      setToWatchCount(toWatchData ? toWatchData.length : 0);

      const { data: favoritesData } = await supabase
        .from("favorite_movies")
        .select("*")
        .eq("user_id", user.id);
      setFavoritesCount(favoritesData ? favoritesData.length : 0);

      // TBD count is not implemented in the database yet, so we set it to 0
    };

    const fetchLastActivity = async () => {
      if (!user) return;

      const { data: lastActivityData } = await supabase
        .from("watched_movies")
        .select("*")
        .eq("user_id", user.id)
        .order("watched_at", { ascending: false })
        .limit(1);

      if (lastActivityData && lastActivityData.length > 0) {
        setLastActivity(lastActivityData[0]);
      }
    };

    fetchCounts();
    fetchLastActivity();
  }, [user]);

  if (!user || !userData) {
    return (
      <ClientLayout header="Profile">
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <h1>Please log in to view your profile</h1>
        </main>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout header="Profile">
      <main className="flex flex-col items-center flex-1 p-4">
        <h1 className="text-2xl font-bold text-text my-4">
          {userData.first_name} {userData.last_name}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <ProfileStatBox label="Watched" stat={watchedCount} />
          <ProfileStatBox label="To Watch" stat={toWatchCount} />
          <ProfileStatBox label="Favorites" stat={favoritesCount} />
          <ProfileStatBox label="TBD" stat={0} />
        </div>
        {lastActivity && (
          <div className="my-4 w-full">
            <ProfileCard
              title="Recent Activity"
              content={`Watched "${lastActivity.title}"`}
              subcontent={
                isToday(new Date(lastActivity.watched_at))
                  ? "Today"
                  : `${formatDistanceToNow(new Date(lastActivity.watched_at), {
                      addSuffix: true,
                    })}`
              }
            />
          </div>
        )}
      </main>
    </ClientLayout>
  );
}
