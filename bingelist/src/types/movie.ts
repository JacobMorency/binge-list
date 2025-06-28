export type Movie = {
  page: number;
  results: MediaResult[];
};

export type SupabaseMovie = {
  movie_id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  media_type: string;
  user_id: string;
};

export type MediaType = "movie" | "tv";

export type MediaResult = {
  id: number;
  media_type: MediaType;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
} & (
  | {
      media_type: "movie";
      title: string;
      release_date: string;
    }
  | {
      media_type: "tv";
      name: string;
      first_air_date: string;
    }
);

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TVDetails = {
  backdrop_path: string;
  created_by: { id: number; name: string; profile_path: string | null }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: { id: number; name: string; logo_path: string | null }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};
