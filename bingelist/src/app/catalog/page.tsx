import ClientLayout from "@/app/components/clientlayout";
import { fetchTMDB } from "@/lib/tmdb";
import Input from "@/app/components/ui/input";
import MovieRow from "@/app/components/catalog/movierow";

export default async function CatalogPage() {
  const trendingMovies = await fetchTMDB("trending/movie/week");

  return (
    <ClientLayout header="Catalog">
      <div className="my-4">
        <Input type="text" placeholder="Search..." className="w-full" />
      </div>
      <main className="">
        <MovieRow
          header="Popular Movies This Week"
          movies={trendingMovies.results}
        />
      </main>
    </ClientLayout>
  );
}
