import ClientLayout from "@/app/components/clientlayout";

import SearchInput from "@/app/components/catalog/searchinput";
import MovieRow from "@/app/components/catalog/movierow";
import type { MediaResult } from "@/types/movie";

type CatalogContentProps = {
  trendingMovies: MediaResult[];
  trendingTV: MediaResult[];
  topRatedMovies: MediaResult[];
  topRatedTV: MediaResult[];
};

export default function CatalogContent({
  trendingMovies,
  trendingTV,
  topRatedMovies,
  topRatedTV,
}: CatalogContentProps) {
  const contentLoaded =
    trendingMovies.length > 0 &&
    trendingTV.length > 0 &&
    topRatedMovies.length > 0 &&
    topRatedTV.length > 0;

  if (!contentLoaded) {
    return (
      <ClientLayout header="Catalog">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Loading content...</p>
        </div>
      </ClientLayout>
    );
  }
  return (
    <ClientLayout header="Catalog">
      <div className="pb-10">
        <div className="my-4">
          <SearchInput />
        </div>
        <main>
          <MovieRow header="Popular Movies This Week" movies={trendingMovies} />
          <MovieRow header="Popular TV Shows This Week" movies={trendingTV} />
          <MovieRow header="Top Rated Movies" movies={topRatedMovies} />
          <MovieRow header="Top Rated TV Shows" movies={topRatedTV} />
        </main>
      </div>
    </ClientLayout>
  );
}
