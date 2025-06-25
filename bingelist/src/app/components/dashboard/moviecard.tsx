import { SupabaseMovie } from "@/types/movie";
import Image from "next/image";
import Button from "@/app/components/ui/button";
import supabase from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/context/authContext";
import { IoClose, IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import { MovieDetails } from "@/types/movie";

type MovieCardProps = {
  movie: SupabaseMovie;
  selectedTab: string;
  onRemove: () => void;
};

export default function MovieCard({
  movie,
  selectedTab,
  onRemove,
}: MovieCardProps) {
  const { user } = useAuth();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [mediaType, setMediaType] = useState<string>("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(
        `/api/tmdb/moviedetails?movieId=${movie.movie_id}&mediaType=${movie.media_type}`
      );
      if (!res.ok) {
        console.error("Failed to fetch movie details:", res.statusText);
        return;
      }
      const data: MovieDetails = await res.json();
      if (!data) {
        console.error("No movie details found for ID:", movie.movie_id);
        return;
      }
      console.log("Fetched movie details:", data);
      setMovieDetails(data);
    };

    fetchMovieDetails();
    if (movie.media_type === "tv") {
      setMediaType("TV");
    } else if (movie.media_type === "movie") {
      setMediaType("M");
    }
  }, [movie.movie_id, movie.media_type]);

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
        onRemove();
      }
    } catch (error) {
      console.error(`Error removing movie from ${selectedTab}:`, error);
    }
  };

  return (
    <div className="bg-base-100 shadow-xl flex p-4 gap-2 rounded-md relative">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={75}
        height={112}
        className="flex-shrink-0 self-start"
      />
      <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
        {mediaType}
      </span>
      <div>
        <h2 className="text-md font-bold">{movie.title}</h2>
        <p className="text-text-muted">
          {movieDetails?.release_date?.split("-")[0]} -{" "}
          {movieDetails?.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(", ")}
        </p>
        <p className="flex items-center gap-1 text-sm">
          <IoStar fill="gold" /> {movieDetails?.vote_average.toFixed(2)}
        </p>
        <Button className="mt-3 flex items-center gap-2" onClick={removeMovie}>
          <IoClose size={18} />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
}
