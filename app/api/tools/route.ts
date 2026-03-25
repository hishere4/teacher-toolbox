import { NextResponse } from "next/server";
import { tools, categories, searchTools, getToolsByCategory, getPopularTools, getLatestTools } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "popular"; // popular, latest, rating
  const limit = parseInt(searchParams.get("limit") || "20");

  let result = [...tools];

  // Filter by category
  if (category) {
    result = getToolsByCategory(category);
  }

  // Search
  if (search) {
    result = searchTools(search);
  }

  // Sort
  switch (sort) {
    case "latest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "popular":
    default:
      result.sort((a, b) => b.viewCount - a.viewCount);
      break;
  }

  // Limit
  result = result.slice(0, limit);

  return NextResponse.json({ tools: result, total: result.length });
}
