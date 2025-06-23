type MovieCardProps = {
  movie: any;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <p>{movie.title}</p>
    </div>
  );
}
