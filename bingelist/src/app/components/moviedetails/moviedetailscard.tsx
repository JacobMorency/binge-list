"use client";
import { CrewMember, MovieDetails, TVDetails } from "@/types/movie";
import CastMember from "@/app/components/moviedetails/castmember";
import BackButton from "@/app/components/moviedetails/backbutton";
import { IoStar } from "react-icons/io5";
import Image from "next/image";
import DetailsActionButtons from "@/app/components/moviedetails/detailsactionbuttons";
import {
  addMovieToList,
  removeMovieFromList,
  checkMovieInList,
} from "@/lib/movieListHelpers";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";

type MovieDetailsCardProps = {
  movie: MovieDetails | TVDetails;
  credits: { cast: CrewMember[]; crew: CrewMember[] };
  mediaType: string;
  id: string;
};

export default function MovieDetailsCard({
  movie,
  credits,
  mediaType,
  id,
}: MovieDetailsCardProps) {
  const displayTitle = "title" in movie ? movie.title : movie.name;
  const displayYear =
    "release_date" in movie
      ? movie.release_date?.slice(0, 4)
      : movie.first_air_date?.slice(0, 4);
  const displayRuntime = "runtime" in movie ? movie.runtime : null;
  const displaySeasons =
    "number_of_seasons" in movie ? movie.number_of_seasons : null;

  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { user } = useAuth();

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
    };

    checkLists();
  }, [user, movie.id]);

  const toggleWatchlist = async (): Promise<void> => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (await checkMovieInList(user.id, movie.id, "movies_to_watch")) {
      removeMovieFromList(user.id, movie.id, "movies_to_watch");
      setIsInWatchlist(false);
    } else {
      addMovieToList(user.id, movie, mediaType, "movies_to_watch");
      setIsInWatchlist(true);
    }
  };

  const toggleWatched = async (): Promise<void> => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (await checkMovieInList(user.id, movie.id, "watched_movies")) {
      removeMovieFromList(user.id, movie.id, "watched_movies");
      setIsWatched(false);
    } else {
      addMovieToList(user.id, movie, mediaType, "watched_movies");
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
      addMovieToList(user.id, movie, mediaType, "favorite_movies");
      setIsFavorite(true);
    }
  };

  return (
    <div
      className="w-full h-[400px] flex flex-col p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0, 0, 0, 0.4) , var(--color-bg-dark)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 mb-24">
        <BackButton />
      </div>

      {/* Poster and info */}
      <div className="flex gap-4 items-center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={displayTitle || "Movie Poster"}
          width={100}
          height={150}
          className="rounded-md shadow-lg self-start flex-shrink-0"
        />
        <div className="flex flex-col gap-2 text-text">
          <h1 className="text-2xl font-bold">{displayTitle}</h1>
          <div className="flex gap-2">
            <span className="bg-primary text-xs font-semibold px-3 py-1 rounded-full">
              {displayYear || "Unknown Year"}
            </span>
            <span className="bg-primary text-xs font-semibold px-3 py-1 rounded-full">
              {mediaType === "movie" ? "Movie" : "TV"}
            </span>
            <span className="flex items-center">
              <IoStar fill="gold" className="mr-1" />
              {movie.vote_average.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <DetailsActionButtons
        movieId={id}
        toggleWatchlist={toggleWatchlist}
        toggleWatched={toggleWatched}
        toggleFavorite={toggleFavorite}
        isInWatchlist={isInWatchlist}
        isWatched={isWatched}
        isFavorite={isFavorite}
      />
      {/* Overview */}
      <div>
        <h2 className="font-bold text-xl">Overview</h2>
        <p className="text-text-muted">
          {movie.overview ||
            "No overview available for this movie or TV show. Please check back later."}
        </p>
        {/* Director and Runtime */}
        <div className="my-4 flex gap-8">
          <span>
            <p className="font-semibold">Director</p>
            <p className="text-text-muted">
              {credits.crew.find((person) => person.job === "Director")?.name ||
                "No director available"}
            </p>
          </span>
          <span>
            <p className="font-semibold">Runtime</p>
            <p className="text-text-muted">
              {displayRuntime
                ? `${displayRuntime} min`
                : displaySeasons
                ? `${displaySeasons} season${displaySeasons > 1 ? "s" : ""}`
                : "N/A"}
            </p>
          </span>
        </div>
      </div>
      {/* Cast */}
      <div className="pb-10">
        <h3 className="text-xl font-bold mb-4">Cast</h3>
        {credits.cast.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {credits.cast.slice(0, 10).map((castMember) => (
              <CastMember key={castMember.id} castMember={castMember} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted">No cast information available.</p>
        )}
      </div>
    </div>
  );
}
