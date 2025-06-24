import ClientLayout from "@/app/components/clientlayout";
import { fetchTMDB } from "@/lib/tmdb";
import SearchInput from "@/app/components/catalog/searchinput";
import MovieRow from "@/app/components/catalog/movierow";

export default async function CatalogPage() {
  const trendingMovies = await fetchTMDB("trending/movie/week");
  const trendingTV = await fetchTMDB("trending/tv/week");
  const topRatedMovies = await fetchTMDB("movie/top_rated");
  const topRatedTV = await fetchTMDB("tv/top_rated");

  return (
    <ClientLayout header="Catalog">
      <div className="pb-24">
        <div className="my-4">
          <SearchInput />
        </div>
        <main>
          <MovieRow
            header="Popular Movies This Week"
            movies={trendingMovies.results}
          />
          <MovieRow
            header="Popular TV Shows This Week"
            movies={trendingTV.results}
          />
          <MovieRow header="Top Rated Movies" movies={topRatedMovies.results} />
          <MovieRow header="Top Rated TV Shows" movies={topRatedTV.results} />
        </main>
      </div>
    </ClientLayout>
  );
}
