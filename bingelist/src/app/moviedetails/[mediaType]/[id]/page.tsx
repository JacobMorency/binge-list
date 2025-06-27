import Image from "next/image";
import { fetchTMDB } from "@/lib/tmdb";
import { IoStar, IoAdd, IoTimeOutline, IoHeartOutline } from "react-icons/io5";
import { CrewMember } from "@/types/movie";
import CastMember from "@/app/components/moviedetails/castmember";
import BackButton from "@/app/components/moviedetails/backbutton";

type Params = Promise<{
  id: string;
  mediaType: string;
}>;

export default async function MovieDetailsPage({ params }: { params: Params }) {
  const { id, mediaType } = await params;
  const movie = await fetchTMDB(`${mediaType}/${id}`);
  const credits: { cast: CrewMember[]; crew: CrewMember[] } = await fetchTMDB(
    `${mediaType}/${id}/credits`
  );

  return (
    <main>
      <div
        className="w-full h-[400px] flex flex-col p-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(0, 0, 0, 0.4) , var(--color-bg-dark)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-24">
          <BackButton />
        </div>

        {/* Poster and info */}
        <div className="flex gap-4 items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name || "Movie Poster"}
            width={100}
            height={150}
            className="rounded-md shadow-lg self-start flex-shrink-0"
          />
          <div className="flex flex-col gap-2 text-text">
            <h1 className="text-2xl font-bold">{movie.title || movie.name}</h1>
            <div className="flex gap-2">
              <span className="bg-primary text-xs font-semibold px-3 py-1 rounded-full">
                {movie.release_date?.slice(0, 4) ??
                  movie.first_air_date?.slice(0, 4) ??
                  "Unknown Year"}
              </span>
              <span className="bg-primary text-xs font-semibold px-3 py-1 rounded-full">
                {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
              </span>
              <span className="flex items-center">
                <IoStar fill="gold" className="mr-1" />
                {movie.vote_average.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 my-8 w-full justify-between">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 font-bold py-2 bg-primary text-text rounded-md whitespace-nowrap">
            <IoAdd size={20} /> Add to Watchlist
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 font-bold py-2 bg-primary text-text rounded-md">
            <IoTimeOutline size={20} /> Watched
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-2 font-bold py-2 bg-primary text-text rounded-md">
            <IoHeartOutline size={20} />
          </button>
        </div>
        {/* Overview */}
        <div>
          <h2 className="font-bold text-xl">Overview</h2>
          <p className="text-text-muted">
            {movie.overview ||
              "No overview available for this movie or TV show. Please check back later."}
          </p>
          {/* Director and Runtime */}
          <div className="my-4 flex gap-8">
            <span>
              <p className="font-semibold">Director</p>
              <p className="text-text-muted">
                {credits.crew.find((person) => person.job === "Director")
                  ?.name || "No director available"}
              </p>
            </span>
            <span>
              <p className="font-semibold">Runtime</p>
              <p className="text-text-muted">
                {movie.runtime
                  ? `${movie.runtime} minutes`
                  : "No runtime available"}
              </p>
            </span>
          </div>
        </div>
        {/* Cast */}
        <div className="pb-10">
          <h3 className="text-xl font-bold mb-4">Cast</h3>
          {credits.cast.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {credits.cast.slice(0, 10).map((castMember) => (
                <CastMember key={castMember.id} castMember={castMember} />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">No cast information available.</p>
          )}
        </div>
      </div>
    </main>
  );
}
