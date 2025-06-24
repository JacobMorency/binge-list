"use client";
import Input from "@/app/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { MovieResult } from "@/types/movie";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<MovieResult[]>([]);

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

      <div>
        {results.map((result) => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}
