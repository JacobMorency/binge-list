"use client";
import Input from "@/app/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { MediaResult } from "@/types/movie";
import MovieSearchRow from "@/app/components/catalog/moviesearchrow";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<MediaResult[]>([]);

  const router = useRouter();
  const handleMovieClick = (movieId: number, mediaType: string) => {
    router.push(`/moviedetails/${mediaType}/${movieId}`);
  };
  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (!term.trim()) return;
        const res = await fetch(`/api/tmdb/search?query=${term}`);
        if (!res.ok) {
          console.error("TMDB search failed", res.status);
          return;
        }
        const data = await res.json();
        setResults(data.results || []);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search for movies or shows..."
        className="input input-bordered input-primary w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {results.length > 0 && (
        <div className="bg-base-300 p-4">
          {results.map((result) => (
            <div key={result.id}>
              {result.poster_path &&
                (result.media_type === "movie"
                  ? result.title
                  : result.name) && (
                  <>
                    <MovieSearchRow
                      movie={result}
                      onClick={() =>
                        handleMovieClick(result.id, result.media_type)
                      }
                    />
                    <hr className="my-2 border-neutral-600" />
                  </>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
