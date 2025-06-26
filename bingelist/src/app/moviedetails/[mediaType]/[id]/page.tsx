import Image from "next/image";
import { fetchTMDB } from "@/lib/tmdb";
import { IoClose, IoStar } from "react-icons/io5";
import Button from "@/app/components/ui/button";

type Params = Promise<{
  id: string;
  mediaType: string;
}>;

export default async function MovieDetailsPage({ params }: { params: Params }) {
  const { id, mediaType } = await params;
  const movie = await fetchTMDB(`${mediaType}/${id}`);
  const posters = await fetchTMDB(`${mediaType}/${id}/images`);

  const randomPoster =
    posters.posters.length > 0
      ? posters.posters[Math.floor(Math.random() * posters.posters.length)]
      : { file_path: movie.poster_path };

  return (
    <main className="flex flex-col items-center justify-center flex-1">
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${randomPoster.file_path}`}
          alt={movie.title || movie.name || "Movie Poster"}
          width={1280}
          height={300}
          className="blur-xs"
        />
        <div className="absolute inset-0 bg-black/75 " />
        <Button className="absolute top-4 left-4 flex items-center gap-2">
          <span>
            <IoClose size={20} />
          </span>
          Back
        </Button>
        <div className="flex items-start absolute top-20 left-4 gap-4 mt-12">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name || "Movie Poster"}
            width={100}
            height={150}
            className="self-start flex-shrink-0 rounded-md shadow-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{movie.title || movie.name}</h1>
            <div className="flex gap-2">
              <span className="bg-primary text-text text-xs font-semibold px-3 py-1 rounded-full">
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : movie.first_air_date
                  ? movie.first_air_date.slice(0, 4)
                  : "Unknown Year"}
              </span>
              <span className="bg-primary text-text text-xs font-semibold px-3 py-1 rounded-full">
                {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
              </span>
              <span>
                <IoStar fill="gold" className="inline-block mr-1" />
                {movie.vote_average.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <p className="mt-2">{movie.overview}</p>
      </div>
    </main>
  );
}
