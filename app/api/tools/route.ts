import { NextResponse } from "next/server";
import { getTools, createTool } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const sort = (searchParams.get("sort") as 'popular' | 'latest') || "popular";
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const tools = await getTools({ category, search, sort, limit });
    return NextResponse.json({ tools, total: tools.length });
  } catch (error) {
    console.error("Failed to fetch tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
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

    const tool = await createTool({
      slug,
      titleEn: titleEn || titleZh,
      titleZh,
      descEn: descEn || descZh,
      descZh,
      externalUrl,
      categoryId,
      authorId: userId,
      instructions: instructions || null,
      tags,
      gradeLevels,
      subjects: [],
      status: 'PUBLISHED',
    });

    return NextResponse.json(
      { message: "上載成功", tool },
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
