const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in environment variables");
}

export async function fetchTMDB(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY!);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  // Cache the response for 1 hour
  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.statusText}`);
  }

  return res.json();
}
