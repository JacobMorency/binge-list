import { CrewMember } from "@/types/movie";
import Image from "next/image";

export default function CastMember({ castMember }: { castMember: CrewMember }) {
  return (
    <div className="bg-bg-light p-2 rounded-md shadow-md flex items-center w-full">
      <div className="rounded-full overflow-hidden mr-2">
        <Image
          src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
          alt={castMember.name}
          width={100}
          height={100}
          className="w-12 h-12 object-cover"
        />
      </div>
      <p className="font-semibold">{castMember.name}</p>
    </div>
  );
}
