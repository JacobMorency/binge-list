import supabase from "@/app/lib/supabaseClient";
import { MovieDetails, TVDetails, MediaResult } from "@/types/movie";

export async function addMovieToList(
  userId: string,
  movie: MovieDetails | TVDetails | MediaResult,
  mediaType: string,
  tableName: string
): Promise<void> {
  try {
    console.log();
    const title = "title" in movie ? movie.title : movie.name;

    const releaseDate = new Date(
      "release_date" in movie ? movie.release_date : movie.first_air_date
    )
      .toISOString()
      .split("T")[0];
    const { error } = await supabase.from(tableName).insert([
      {
        user_id: userId,
        movie_id: movie.id,
        title,
        poster_path: movie.poster_path,
        release_date: releaseDate,
        media_type: mediaType,
      },
    ]);

    if (error) {
      console.error(`Error adding to ${tableName}:`, error);
    } else {
      console.log(`Movie added to ${tableName}`);
    }
  } catch (err) {
    console.error(`Unexpected error adding to ${tableName}:`, err);
  }
}

export async function removeMovieFromList(
  userId: string,
  movieId: number,
  tableName: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) {
      console.error(`Error removing from ${tableName}:`, error);
    } else {
      console.log(`Movie removed from ${tableName}`);
    }
  } catch (err) {
    console.error(`Unexpected error removing from ${tableName}:`, err);
  }
}

export async function checkMovieInList(
  userId: string,
  movieId: number,
  tableName: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("movie_id")
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) {
      console.error(`Error checking movie in ${tableName}:`, error);
      return false;
    }

    return Array.isArray(data) && data.length > 0;
  } catch (err) {
    console.error(`Unexpected error checking movie in ${tableName}:`, err);
    return false;
  }
}
