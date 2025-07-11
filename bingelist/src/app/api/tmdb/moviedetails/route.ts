import { NextResponse, NextRequest } from "next/server";
import { fetchTMDB } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const movieId = req.nextUrl.searchParams.get("movieId");
  const mediaType = req.nextUrl.searchParams.get("mediaType");

  if (!mediaType) {
    return NextResponse.json(
      { error: "Media type is required" },
      { status: 400 }
    );
  }

  if (!movieId) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );
  }

  try {
    const data = await fetchTMDB(`${mediaType}/${movieId}`);
    if (!data) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
