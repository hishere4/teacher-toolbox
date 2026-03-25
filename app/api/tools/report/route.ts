import { NextResponse } from "next/server";

// In-memory reports storage
const reports: Array<{
  id: string;
  toolId: string;
  reporterId: string;
  reason: string;
  status: string;
  createdAt: string;
}> = [];

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

    const report = {
      id: Math.random().toString(36).substr(2, 9),
      toolId,
      reporterId: userId,
      reason,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    reports.push(report);

    console.log("New report:", report);

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

export { reports };
