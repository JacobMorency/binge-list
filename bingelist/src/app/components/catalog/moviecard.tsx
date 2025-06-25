import { MediaResult } from "@/types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoAdd, IoTimeOutline, IoHeartOutline } from "react-icons/io5";
import supabase from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/context/authContext";

type MovieCardProps = {
  movie: MediaResult;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  const releaseDate = new Date(
    movie.media_type === "tv" ? movie.first_air_date : movie.release_date || ""
  );

  const handleMovieClick = () => {
    router.push(`/moviedetails/${movie.media_type}/${movie.id}`);
  };

  const addToWatchlist = async (): Promise<void> => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const { data, error } = await supabase.from("movies_to_watch").insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.media_type === "tv" ? movie.name : movie.title,
          poster_path: movie.poster_path,
          release_date: releaseDate,
          media_type: movie.media_type,
        },
      ]);
      if (error) {
        console.error("Error adding movie to watchlist:", error);
      }
      console.log("Movie added to watchlist:", data);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };

  const markAsWatched = async (): Promise<void> => {
    // Logic to mark movie as watched
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const { data, error } = await supabase.from("watched_movies").insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.media_type === "tv" ? movie.name : movie.title,
          poster_path: movie.poster_path,
          release_date: releaseDate,
          media_type: movie.media_type,
        },
      ]);
      if (error) {
        console.error("Error marking movie to watch:", error);
      }
      console.log("Movie added to watch:", data);
    } catch (error) {
      console.error("Error marking movie to watch:", error);
    }
  };

  const toggleFavorite = async (): Promise<void> => {
    // Logic to toggle favorite status
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const { data, error } = await supabase.from("favorite_movies").insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.media_type === "tv" ? movie.name : movie.title,
          poster_path: movie.poster_path,
          release_date: releaseDate,
          media_type: movie.media_type,
        },
      ]);
      if (error) {
        console.error("Error toggling favorite status:", error);
      }
      console.log("Movie favorite status toggled:", data);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <div className="shrink-0 w-40 my-2">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={
          movie.media_type === "tv" ? movie.name : movie.title || "Movie Poster"
        }
        width={500}
        height={750}
        className="rounded-md"
        onClick={handleMovieClick}
      />
      <div className="flex justify-between items-center mt-2 gap-2 px-2 bg-pr">
        <button
          className="outline rounded-md px-2 py-1 bg-primary"
          onClick={addToWatchlist}
        >
          <IoAdd size={24} />
        </button>
        <button
          className="outline rounded-md px-2 py-1 bg-primary"
          onClick={markAsWatched}
        >
          <IoTimeOutline size={24} />
        </button>
        <button
          className="outline rounded-md px-2 py-1 bg-primary"
          onClick={toggleFavorite}
        >
          <IoHeartOutline size={24} />
        </button>
      </div>
    </div>
  );
}
