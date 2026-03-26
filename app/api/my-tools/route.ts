import { NextResponse } from "next/server";
import { getToolsByUser } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "請提供 userId" },
      { status: 400 }
    );
  }

  try {
    const tools = await getToolsByUser(userId);
    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Failed to fetch my tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}
