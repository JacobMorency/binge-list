import Image from "next/image";
import { MovieResult } from "@/types/movie";

export default function MovieSearchRow({
  movie,
  onClick,
}: {
  movie: MovieResult;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex items-center p-2 cursor-pointer hover:bg-base-200 rounded"
      onClick={onClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className="w-16 h-24 object-cover rounded mr-3"
        width={64}
        height={96}
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-primary-content">
          {movie.title}
        </span>
        <span className="text-sm text-neutral-content">
          {movie.release_date}
        </span>
      </div>
    </div>
  );
}
