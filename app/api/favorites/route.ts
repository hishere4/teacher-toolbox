import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        tool: {
          include: {
            author: {
              select: { id: true, name: true, image: true }
            },
            category: {
              select: { id: true, nameEn: true, nameZh: true, slug: true }
            },
            _count: {
              select: { reviews: true, favorites: true }
            }
          }
        }
      }
    });

    const tools = favorites.map(f => f.tool);
    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
