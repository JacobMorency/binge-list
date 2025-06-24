import { SupabaseMovie } from "@/types/movie";
import Image from "next/image";
import Button from "@/app/components/ui/button";
import supabase from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/context/authContext";

type MovieCardProps = {
  movie: SupabaseMovie;
  selectedTab: string;
};

export default function MovieCard({ movie, selectedTab }: MovieCardProps) {
  const { user } = useAuth();
  if (!user) {
    console.error("User is not authenticated");
    return null;
  }
  const removeMovie = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from(selectedTab)
        .delete()
        .eq("movie_id", movie.movie_id)
        .eq("user_id", user.id);
      if (error) {
        console.error(`Error removing movie from ${selectedTab}:`, error);
      } else {
        console.log(`Movie removed from ${selectedTab}:`, data);
      }
    } catch (error) {
      console.error(`Error removing movie from ${selectedTab}:`, error);
    }
  };

  return (
    <div className="bg-base-100 shadow-xl flex p-4 gap-2 rounded-md">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={75}
        height={112}
      />
      <div>
        <h2 className="text-md font-bold">{movie.title}</h2>
        <p>Year - Genre </p>
        <p>Rating</p>
        <Button onClick={removeMovie}>Remove</Button>
      </div>
    </div>
  );
}
