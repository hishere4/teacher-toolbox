import { NextResponse } from "next/server";
import { getToolBySlug, incrementToolViews } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  try {
    const tool = await getToolBySlug(slug);
    
    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }

    // Increment view count asynchronously
    incrementToolViews(slug).catch(console.error);

    return NextResponse.json({ tool });
  } catch (error) {
    console.error("Failed to fetch tool:", error);
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}
