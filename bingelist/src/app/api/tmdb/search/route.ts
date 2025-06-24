import { NextRequest, NextResponse } from "next/server";
import { fetchTMDB } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const data = await fetchTMDB("search/multi?", { query });
  return NextResponse.json(data);
}
