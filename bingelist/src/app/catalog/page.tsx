import { fetchTMDB } from "@/lib/tmdb";
import CatalogContent from "@/app/components/catalog/catalogcontent";

export default async function CatalogPage() {
  const trendingMovies = (await fetchTMDB("trending/movie/week")).results;
  const trendingTV = (await fetchTMDB("trending/tv/week")).results;
  const topRatedMovies = (await fetchTMDB("movie/top_rated")).results;
  const topRatedTV = (await fetchTMDB("tv/top_rated")).results;

  return (
    <CatalogContent
      trendingMovies={trendingMovies}
      trendingTV={trendingTV}
      topRatedMovies={topRatedMovies}
      topRatedTV={topRatedTV}
    />
  );
}
