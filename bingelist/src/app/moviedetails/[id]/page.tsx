import ClientLayout from "@/app/components/clientlayout";
import { fetchTMDB } from "@/lib/tmdb";
import Image from "next/image";

type MovieDetailsProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  const movie = await fetchTMDB(`movie/${params.id}`);

  return (
    <ClientLayout>
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded-md"
        />
        <p className="mt-2">{movie.overview}</p>
      </main>
    </ClientLayout>
  );
}
