import ClientLayout from "@/app/components/clientlayout";
import { fetchTMDB } from "@/lib/tmdb";
import Image from "next/image";

export default async function CatalogPage() {
  const trendingMovies = await fetchTMDB("trending/movie/week");
  console.log("Trending movies:", trendingMovies.results[1].title);

  return (
    <ClientLayout header="Catalog">
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <p className="text-primary-content">Welcome to your catalog!</p>
        <Image
          src={`https://image.tmdb.org/t/p/w500${trendingMovies.results[1].poster_path}`}
          alt={trendingMovies.results[1].title || "Movie Poster"}
          width={200}
          height={300}
          className="rounded-lg object-cover"
          priority
        />
        <p className="text-primary-content mt-2">
          {trendingMovies.results[1].title}
        </p>
      </main>
    </ClientLayout>
  );
}
