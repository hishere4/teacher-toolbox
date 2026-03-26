import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { toolId, reason, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    if (!toolId || !reason) {
      return NextResponse.json(
        { message: "請填寫舉報原因" },
        { status: 400 }
      );
    }

    // Create report in database
    await prisma.report.create({
      data: {
        toolId,
        reporterId: userId,
        reason,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { message: "舉報成功" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json(
      { message: "舉報時發生錯誤" },
      { status: 500 }
    );
  }
}
