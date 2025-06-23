import ClientLayout from "@/app/components/clientlayout";
import { fetchTMDB } from "@/lib/tmdb";
import Image from "next/image";
import Input from "@/app/components/ui/input";
import MovieRow from "@/app/components/catalog/movierow";

export default async function CatalogPage() {
  const trendingMovies = await fetchTMDB("trending/movie/week");
  console.log("Trending Movies:", trendingMovies);

  return (
    <ClientLayout header="Catalog">
      <div className="my-4">
        <Input type="text" placeholder="Search..." className="w-full" />
      </div>
      <main className="">
        <MovieRow header="Popular This Week" movies={trendingMovies.results} />
      </main>
    </ClientLayout>
  );
}
