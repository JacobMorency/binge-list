"use client";
import MovieCard from "@/app/components/catalog/moviecard";
import type { MediaResult } from "@/types/movie";
import { useEffect, useState } from "react";

type MovieRowProps = {
  header: string;
  movies: MediaResult[];
};

export default function MovieRow({ header, movies }: MovieRowProps) {
  const [moviesList, setMoviesList] = useState<MediaResult[]>([]);

  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  return (
    <div className="my-4">
      <h2 className="font-bold text-2xl">{header}</h2>
      <div className="flex overflow-x-auto space-x-2 py-2">
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
