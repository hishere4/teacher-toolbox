import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/requests/[id]/vote - Upvote a request
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

    // Check if already voted
    const existingVote = await prisma.requestVote.findUnique({
      where: {
        requestId_userId: {
          requestId,
          userId,
        },
      },
    });

    if (existingVote) {
      // Remove vote (toggle)
      await prisma.requestVote.delete({
        where: { id: existingVote.id },
      });
      
      await prisma.request.update({
        where: { id: requestId },
        data: { upvotes: { decrement: 1 } },
      });

      return NextResponse.json({ message: "取消支持", voted: false });
    } else {
      // Add vote
      await prisma.requestVote.create({
        data: {
          requestId,
          userId,
        },
      });
      
      await prisma.request.update({
        where: { id: requestId },
        data: { upvotes: { increment: 1 } },
      });

      return NextResponse.json({ message: "支持成功", voted: true });
    }
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { message: "投票時發生錯誤" },
      { status: 500 }
    );
  }
}
