import { SupabaseMovie } from "@/types/movie";
import Image from "next/image";
import Button from "@/app/components/ui/button";
import supabase from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/context/authContext";
import { IoClose, IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import { MediaResult } from "@/types/movie";
import Loading from "@/app/components/ui/loading";
import { useRouter } from "next/navigation";

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
  const [movieDetails, setMovieDetails] = useState<MediaResult | null>(null);
  const [mediaType, setMediaType] = useState<string>("");

  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/moviedetails/${movie.media_type}/${movie.movie_id}`);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(
        `/api/tmdb/moviedetails?movieId=${movie.movie_id}&mediaType=${movie.media_type}`
      );
      if (!res.ok) {
        console.error("Failed to fetch movie details:", res.statusText);
        return;
      }
      const data: MediaResult = await res.json();
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

  if (!movieDetails) {
    return <Loading />;
  }

  return (
    <div className=" shadow-xl flex p-4 gap-2 rounded-md relative bg-bg-light">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={75}
        height={112}
        className="flex-shrink-0 self-start"
        onClick={handleMovieClick}
      />
      <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
        {mediaType}
      </span>
      <div>
        <a
          href={`/moviedetails/${movie.media_type}/${movie.movie_id}`}
          className="text-lg font-bold"
        >
          {movie.title}
        </a>
        <p className="text-text-muted">
          {movie.release_date?.slice(0, 4)} •{" "}
          {movieDetails.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(", ")}
        </p>
        <p className="flex items-center gap-1 text-sm">
          <IoStar fill="gold" /> {movieDetails.vote_average.toFixed(2)}
        </p>
        <Button className="mt-3 flex items-center gap-2" onClick={removeMovie}>
          <IoClose size={18} />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
}
