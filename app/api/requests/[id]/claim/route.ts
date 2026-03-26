import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/requests/[id]/claim - Claim a request
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await req.json();
    const requestId = params.id;

    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    const request = await prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return NextResponse.json(
        { message: "請求不存在" },
        { status: 404 }
      );
    }

    if (request.status !== "OPEN") {
      return NextResponse.json(
        { message: "此請求已被認領或已完成" },
        { status: 400 }
      );
    }

    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: "IN_PROGRESS",
        claimedById: userId,
      },
    });

    return NextResponse.json({ message: "認領成功" });
  } catch (error) {
    console.error("Claim error:", error);
    return NextResponse.json(
      { message: "認領時發生錯誤" },
      { status: 500 }
    );
  }
}
