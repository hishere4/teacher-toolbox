import { NextResponse } from "next/server";
import { tools, users } from "@/lib/data";

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    
    // Get user from form data (in production, use proper auth)
    const userId = formData.get("userId") as string;
    
    if (!userId) {
      return NextResponse.json(
        { message: "請先登入" },
        { status: 401 }
      );
    }

    const titleZh = formData.get("titleZh") as string;
    const titleEn = formData.get("titleEn") as string;
    const descZh = formData.get("descZh") as string;
    const descEn = formData.get("descEn") as string;
    const externalUrl = formData.get("externalUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    const instructions = formData.get("instructions") as string;
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const gradeLevels = JSON.parse(formData.get("gradeLevels") as string || "[]");

    // Validation
    if (!titleZh || !descZh || !externalUrl || !categoryId) {
      return NextResponse.json(
        { message: "請填寫所有必填字段" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(externalUrl);
    } catch {
      return NextResponse.json(
        { message: "請輸入有效的工具連結" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = titleZh
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50) + "-" + Date.now().toString(36);

    // Find author
    const author = users.find((u) => u.id === userId) || {
      id: userId,
      name: "未知用戶",
      image: null,
    };

    // Find category
    const { categories } = await import("@/lib/data");
    const category = categories.find((c) => c.id === categoryId) || categories[0];

    // Create tool
    const newTool = {
      id: Math.random().toString(36).substr(2, 9),
      slug,
      titleEn: titleEn || titleZh,
      titleZh,
      descEn: descEn || descZh,
      descZh,
      externalUrl,
      thumbnail: null,
      status: "PUBLISHED" as const,
      viewCount: 0,
      gradeLevels,
      subjects: [] as string[],
      tags,
      instructions: instructions || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: userId,
      categoryId,
      author,
      category,
      _count: { reviews: 0, favorites: 0 },
    };

    // Add to in-memory store
    tools.unshift(newTool);

    return NextResponse.json(
      { message: "上載成功", tool: newTool },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "上載時發生錯誤" },
      { status: 500 }
    );
  }
}
