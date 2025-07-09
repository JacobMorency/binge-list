import { fetchTMDB } from "@/lib/tmdb";

import { CrewMember } from "@/types/movie";

import MovieDetailsCard from "@/app/components/moviedetails/moviedetailscard";

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
    <MovieDetailsCard
      movie={movie}
      credits={credits}
      mediaType={mediaType}
      id={id}
    />
  );
}
