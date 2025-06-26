import ClientLayout from "@/app/components/clientlayout";
import Image from "next/image";
import { fetchTMDB } from "@/lib/tmdb";
import type { PageProps } from "next";

export default async function MovieDetailsPage({
  params,
}: PageProps<{ id: string; mediaType: string }>) {
  const movie = await fetchTMDB(`${params.mediaType}/${params.id}`);

  return (
    <ClientLayout>
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h1 className="text-2xl font-bold">{movie.title || movie.name}</h1>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name || "Movie Poster"}
          width={500}
          height={750}
          className="rounded-md"
        />
        <p className="mt-2">{movie.overview}</p>
      </main>
    </ClientLayout>
  );
}
