import { MediaResult } from "@/types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoAdd,
  IoTimeOutline,
  IoTime,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import { useAuth } from "@/app/context/authContext";
import {
  addMovieToList,
  removeMovieFromList,
  checkMovieInList,
} from "@/lib/movieListHelpers";
import { useState, useEffect } from "react";

type MovieCardProps = {
  movie: MediaResult;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { user } = useAuth();

  const handleMovieClick = () => {
    router.push(`/moviedetails/${movie.media_type}/${movie.id}`);
  };

  useEffect(() => {
    const checkLists = async () => {
      if (!user) return;

      const watchlist = await checkMovieInList(
        user.id,
        movie.id,
        "movies_to_watch"
      );
      const watched = await checkMovieInList(
        user.id,
        movie.id,
        "watched_movies"
      );
      const favorite = await checkMovieInList(
        user.id,
        movie.id,
        "favorite_movies"
      );

      setIsInWatchlist(watchlist);
      setIsWatched(watched);
      setIsFavorite(favorite);
      setIsLoading(false);
    };

    checkLists();
  }, [user, movie.id]);

  const addToWatchlist = async (): Promise<void> => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (await checkMovieInList(user.id, movie.id, "movies_to_watch")) {
      removeMovieFromList(user.id, movie.id, "movies_to_watch");
      setIsInWatchlist(false);
    } else {
      addMovieToList(user.id, movie, movie.media_type, "movies_to_watch");
      setIsInWatchlist(true);
    }
  };

  const markAsWatched = async (): Promise<void> => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (await checkMovieInList(user.id, movie.id, "watched_movies")) {
      removeMovieFromList(user.id, movie.id, "watched_movies");
      setIsWatched(false);
    } else {
      addMovieToList(user.id, movie, movie.media_type, "watched_movies");
      setIsWatched(true);
    }
  };

  const toggleFavorite = async (): Promise<void> => {
    // Logic to toggle favorite status
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (await checkMovieInList(user.id, movie.id, "favorite_movies")) {
      removeMovieFromList(user.id, movie.id, "favorite_movies");
      setIsFavorite(false);
    } else {
      addMovieToList(user.id, movie, movie.media_type, "favorite_movies");
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return (
      <div className="shrink-0 w-40 my-2 animate-pulse bg-gray-200 rounded-md h-[300px]" />
    );
  }

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
        {!isInWatchlist ? (
          <button
            className="border border-border-muted rounded-md px-2 py-1 bg-bg-light"
            onClick={addToWatchlist}
          >
            <IoAdd size={24} />
          </button>
        ) : (
          <button
            className="border border-border rounded-md px-2 py-1 bg-primary"
            onClick={addToWatchlist}
          >
            <IoAdd size={24} />
          </button>
        )}
        {!isWatched ? (
          <button
            className="border border-border-muted rounded-md px-2 py-1 bg-bg-light"
            onClick={markAsWatched}
          >
            <IoTimeOutline size={24} />
          </button>
        ) : (
          <button
            className="border border-border rounded-md px-2 py-1 bg-primary"
            onClick={markAsWatched}
          >
            <IoTime size={24} />
          </button>
        )}
        {!isFavorite ? (
          <button
            className="border border-border-muted rounded-md px-2 py-1 bg-bg-light"
            onClick={toggleFavorite}
          >
            <IoHeartOutline size={24} />
          </button>
        ) : (
          <button
            className="border border-border rounded-md px-2 py-1 bg-primary"
            onClick={toggleFavorite}
          >
            <IoHeart size={24} fill={"pink"} />
          </button>
        )}
      </div>
    </div>
  );
}
