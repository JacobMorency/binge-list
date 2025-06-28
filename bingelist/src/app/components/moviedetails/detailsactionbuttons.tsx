import {
  IoAdd,
  IoClose,
  IoHeartOutline,
  IoTimeOutline,
  IoHeart,
  IoTime,
} from "react-icons/io5";
import {
  addMovieToList,
  removeMovieFromList,
  checkMovieInList,
} from "@/lib/movieListHelpers";

type DetailsActionButtonsProps = {
  movieId: string;
  toggleWatchlist: () => void;
  toggleWatched: () => void;
  toggleFavorite: () => void;
  isInWatchlist: boolean;
  isWatched: boolean;
  isFavorite: boolean;
};

export default function DetailsActionButtons({
  toggleWatchlist,
  toggleWatched,
  toggleFavorite,
  isInWatchlist,
  isWatched,
  isFavorite,
}: DetailsActionButtonsProps) {
  return (
    <div className="flex gap-2 my-8 w-full justify-between">
      <button
        className="flex-1 flex items-center justify-center gap-2 px-4 font-bold py-2 bg-primary text-text rounded-md whitespace-nowrap"
        onClick={toggleWatchlist}
      >
        {isInWatchlist ? <IoClose size={20} /> : <IoAdd size={20} />}
        {isInWatchlist ? "Remove from list" : "Add to Watchlist"}
      </button>
      <button
        className="flex-1 flex items-center justify-center gap-2 px-4 font-bold py-2 bg-primary text-text rounded-md"
        onClick={toggleWatched}
      >
        {isWatched ? <IoTime size={20} /> : <IoTimeOutline size={20} />}
        {isWatched ? "Unwatch" : "Watched"}
      </button>
      <button
        className="flex-1 flex items-center justify-center gap-2 px-2 font-bold py-2 bg-primary text-text rounded-md"
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <IoHeart size={20} fill="pink" />
        ) : (
          <IoHeartOutline size={20} />
        )}
      </button>
    </div>
  );
}
