import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/tools/[id]/favorite - Toggle favorite
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await req.json();
    const toolId = params.id;

    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });

    if (existing) {
      // Remove favorite
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ message: "取消收藏", favorited: false });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId,
          toolId,
        },
      });
      return NextResponse.json({ message: "收藏成功", favorited: true });
    }
  } catch (error) {
    console.error("Favorite error:", error);
    return NextResponse.json(
      { message: "操作時發生錯誤" },
      { status: 500 }
    );
  }
}

// GET /api/tools/[id]/favorite - Check if favorited
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const toolId = params.id;

  if (!userId) {
    return NextResponse.json({ favorited: false });
  }

  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });

    return NextResponse.json({ favorited: !!favorite });
  } catch (error) {
    return NextResponse.json({ favorited: false });
  }
}
