import { fetchTMDB } from "@/lib/tmdb";
import CatalogContent from "@/app/components/catalog/catalogcontent";
import type { MediaResult } from "@/types/movie";

export default async function CatalogPage() {
  const trendingMovies = (await fetchTMDB("trending/movie/week")).results;
  const trendingTV = (await fetchTMDB("trending/tv/week")).results;
  const topRatedMoviesRaw = (await fetchTMDB("movie/top_rated")).results;
  const topRatedTVRaw = (await fetchTMDB("tv/top_rated")).results;

  const topRatedMovies = topRatedMoviesRaw.map((item: MediaResult) => ({
    ...item,
    media_type: "movie",
  }));

  const topRatedTV = topRatedTVRaw.map((item: MediaResult) => ({
    ...item,
    media_type: "tv",
  }));

  return (
    <CatalogContent
      trendingMovies={trendingMovies}
      trendingTV={trendingTV}
      topRatedMovies={topRatedMovies}
      topRatedTV={topRatedTV}
    />
  );
}
