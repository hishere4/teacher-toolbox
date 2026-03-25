import { NextResponse } from "next/server";
import { getToolBySlug, tools } from "@/lib/data";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    return NextResponse.json(
      { error: "Tool not found" },
      { status: 404 }
    );
  }

  // Increment view count (in-memory only for now)
  tool.viewCount += 1;

  return NextResponse.json({ tool });
}
