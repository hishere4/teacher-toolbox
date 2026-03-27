import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tools/[id]/reviews - Get reviews
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const toolId = params.id;

  try {
    const reviews = await prisma.review.findMany({
      where: { toolId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { error: "Failed to get reviews" },
      { status: 500 }
    );
  }
}

// POST /api/tools/[id]/reviews - Create review
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { rating, comment, userId } = await req.json();
    const toolId = params.id;

    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "請提供有效評分（1-5）" },
        { status: 400 }
      );
    }

    // Check if already reviewed
    const existing = await prisma.review.findUnique({
      where: {
        toolId_userId: {
          toolId,
          userId,
        },
      },
    });

    if (existing) {
      // Update existing review
      const review = await prisma.review.update({
        where: { id: existing.id },
        data: { rating, comment },
        include: {
          user: {
            select: { id: true, name: true, image: true }
          }
        }
      });
      return NextResponse.json({ message: "評論更新成功", review });
    }

    // Create new review
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        toolId,
        userId,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    return NextResponse.json(
      { message: "評論提交成功", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { message: "提交評論時發生錯誤" },
      { status: 500 }
    );
  }
}
