import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const sort = searchParams.get("sort") || "popular";

  try {
    const where: any = {};
    if (status) {
      where.status = status.toUpperCase();
    }

    const orderBy = sort === "latest" 
      ? { createdAt: "desc" } 
      : { upvotes: "desc" };

    const requests = await prisma.request.findMany({
      where,
      orderBy,
      include: {
        author: {
          select: { id: true, name: true, image: true }
        },
        claimedBy: {
          select: { id: true, name: true }
        },
        completedTool: {
          select: { id: true, slug: true, titleZh: true }
        },
        _count: {
          select: { votes: true }
        }
      }
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Failed to fetch requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { titleZh, titleEn, descZh, descEn, gradeLevels, subjects, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    if (!titleZh || !descZh) {
      return NextResponse.json(
        { message: "請填寫標題和描述" },
        { status: 400 }
      );
    }

    const request = await prisma.request.create({
      data: {
        titleZh,
        titleEn: titleEn || titleZh,
        descZh,
        descEn: descEn || descZh,
        authorId: userId,
        gradeLevels: gradeLevels || [],
        subjects: subjects || [],
        status: "OPEN",
        upvotes: 0,
      },
    });

    return NextResponse.json(
      { message: "請求創建成功", request },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create request error:", error);
    return NextResponse.json(
      { message: "創建請求時發生錯誤" },
      { status: 500 }
    );
  }
}
