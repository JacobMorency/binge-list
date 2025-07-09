import Image from "next/image";
import { MediaResult } from "@/types/movie";

export default function MovieSearchRow({
  movie,
  onClick,
}: {
  movie: MediaResult;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex items-center p-2 cursor-pointer hover:bg-base-200 rounded"
      onClick={onClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${
          movie.media_type === "movie" ? movie.title : movie.name
        } poster`}
        className="w-16 h-24 object-cover rounded mr-3"
        width={64}
        height={96}
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-primary-content">
          {movie.media_type === "movie" ? movie.title : movie.name}
        </span>
        <span className="text-sm text-neutral-content">
          {movie.media_type === "movie"
            ? movie.release_date
            : movie.first_air_date}
        </span>
      </div>
    </div>
  );
}
