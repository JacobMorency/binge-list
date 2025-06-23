import { MovieResult } from "@/types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MovieCardProps = {
  movie: MovieResult;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/moviedetails/${movie.id}`);
  };

  return (
    <div className="shrink-0 w-40">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="rounded-md"
        onClick={handleClick}
      />
    </div>
  );
}
