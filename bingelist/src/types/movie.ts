export type Movie = {
  page: number;
  results: MovieResult[];
};

export type SupabaseMovie = {
  movie_id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
