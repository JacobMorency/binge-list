"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/context/authContext";
import { SupabaseMovie } from "@/types/movie";
import MovieCard from "@/app/components/dashboard/moviecard";
import {
  IoBookmarkOutline,
  IoHeartOutline,
  IoTimeOutline,
} from "react-icons/io5";

export default function WatchListTabs() {
  const [selectedTab, setSelectedTab] = useState<string>("movies_to_watch");
  const [selectedMovies, setSelectedMovies] = useState<SupabaseMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchToWatchMovies = async () => {
      if (!user) return [];
      setLoading(true);
      const { data, error } = await supabase
        .from("movies_to_watch")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching movies:", error.message);
        setSelectedMovies([]);
      } else {
        setSelectedMovies(data || []);
      }
      setLoading(false);
      return data || [];
    };

    const fetchWatchedMovies = async () => {
      if (!user) return [];
      setLoading(true);
      const { data, error } = await supabase
        .from("watched_movies")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching movies:", error.message);
        setSelectedMovies([]);
      } else {
        setSelectedMovies(data || []);
      }
      setLoading(false);
      return data || [];
    };

    const fetchFavoritesMovies = async () => {
      if (!user) return [];
      setLoading(true);
      const { data, error } = await supabase
        .from("favorite_movies")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching movies:", error.message);
        setSelectedMovies([]);
      } else {
        setSelectedMovies(data || []);
      }
      setLoading(false);
      return data || [];
    };

    if (selectedTab === "movies_to_watch") {
      fetchToWatchMovies();
    } else if (selectedTab === "watched_movies") {
      fetchWatchedMovies();
    } else if (selectedTab === "favorite_movies") {
      fetchFavoritesMovies();
    }
  }, [user, selectedTab]);

  const tabStyle = (tab: string) => {
    return `p-3 ${
      selectedTab === tab ? "bg-primary text-primary-content" : ""
    }`;
  };
  return (
    <div className="">
      <nav role="tablist" className="flex bg-bg-light p-1 rounded-md my-4">
        <button
          role="tab"
          className={`flex-1 rounded-l-md ${tabStyle("movies_to_watch")}`}
          onClick={() => setSelectedTab("movies_to_watch")}
        >
          To Watch (0)
        </button>
        <button
          role="tab"
          className={`flex-1 ${tabStyle("watched_movies")}`}
          onClick={() => setSelectedTab("watched_movies")}
        >
          Watched (0)
        </button>
        <button
          role="tab"
          className={`flex-1 rounded-r-md ${tabStyle("favorite_movies")}`}
          onClick={() => setSelectedTab("favorite_movies")}
        >
          Favorites (0)
        </button>
      </nav>
      <div>
        {!loading ? (
          <>
            {selectedMovies.length === 0 ? (
              <>
                {selectedTab === "movies_to_watch" ? (
                  <div className="text-center ">
                    <IoBookmarkOutline className="text-6xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No movies to watch</h2>
                    <p className="text-text-muted">
                      Add movies to your watchlist to get started.
                    </p>
                  </div>
                ) : selectedTab === "watched_movies" ? (
                  <div className="text-center">
                    <IoTimeOutline className="text-6xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No watched movies</h2>
                    <p className="text-text-muted">
                      Mark movies as watched to see them here.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <IoHeartOutline className="text-6xl mx-auto mb-4" />
                    <h2 className="text-xl font-bold">No favorite movies</h2>
                    <p className="text-text-muted">
                      Add movies to your favorites to see them here.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <ul className="flex flex-col gap-2">
                {selectedMovies.map((movie) => (
                  <li key={movie.movie_id} className="bg-bg-light rounded-md">
                    <MovieCard movie={movie} selectedTab={selectedTab} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
