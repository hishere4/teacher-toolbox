// Database operations with fallback to local data
import { prisma } from "./prisma";
import { categories as localCategories, tools as localTools } from "./data";

// Check if database is available
const isDatabaseAvailable = !!process.env.DATABASE_URL;

// Category operations
export async function getCategories() {
  if (!isDatabaseAvailable) {
    return localCategories;
  }
  
  try {
    return await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { tools: true }
        }
      }
    });
  } catch (error) {
    console.warn("Database not available, using local data");
    return localCategories;
  }
}

// Tool operations
export async function getTools({
  category,
  search,
  sort = 'popular',
  limit = 20,
}: {
  category?: string;
  search?: string;
  sort?: 'popular' | 'latest';
  limit?: number;
}) {
  if (!isDatabaseAvailable) {
    let result = [...localTools];
    
    if (category) {
      const cat = localCategories.find(c => c.slug === category);
      if (cat) {
        result = result.filter(t => t.categoryId === cat.id);
      }
    }
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(t => 
        t.titleZh.toLowerCase().includes(lowerSearch) ||
        t.descZh.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (sort === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result.sort((a, b) => b.viewCount - a.viewCount);
    }
    
    return result.slice(0, limit);
  }
  
  try {
    const where: any = { status: 'PUBLISHED' };
    
    if (category) {
      where.category = { slug: category };
    }
    
    if (search) {
      where.OR = [
        { titleZh: { contains: search, mode: 'insensitive' } },
        { descZh: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const orderBy = sort === 'latest' 
      ? { createdAt: 'desc' } 
      : { viewCount: 'desc' };
    
    return await prisma.tool.findMany({
      where,
      orderBy,
      take: limit,
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
    });
  } catch (error) {
    console.warn("Database not available, using local data");
    return localTools;
  }
}

export async function getToolBySlug(slug: string) {
  if (!isDatabaseAvailable) {
    return localTools.find(t => t.slug === slug) || null;
  }
  
  try {
    return await prisma.tool.findUnique({
      where: { slug },
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
    });
  } catch (error) {
    console.warn("Database not available, using local data");
    return localTools.find(t => t.slug === slug) || null;
  }
}

export async function incrementToolViews(slug: string) {
  if (!isDatabaseAvailable) {
    const tool = localTools.find(t => t.slug === slug);
    if (tool) {
      tool.viewCount += 1;
    }
    return tool;
  }
  
  try {
    return await prisma.tool.update({
      where: { slug },
      data: { viewCount: { increment: 1 } }
    });
  } catch (error) {
    console.warn("Database error");
    return null;
  }
}

export async function createTool(data: any) {
  if (!isDatabaseAvailable) {
    const newTool = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localTools.unshift(newTool as any);
    return newTool;
  }
  
  try {
    return await prisma.tool.create({
      data,
      include: {
        author: {
          select: { id: true, name: true, image: true }
        },
        category: {
          select: { id: true, nameEn: true, nameZh: true, slug: true }
        }
      }
    });
  } catch (error) {
    console.error("Failed to create tool:", error);
    throw error;
  }
}

export async function getToolsByUser(userId: string) {
  if (!isDatabaseAvailable) {
    return localTools.filter(t => t.authorId === userId);
  }
  
  try {
    return await prisma.tool.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: { id: true, nameEn: true, nameZh: true, slug: true }
        },
        _count: {
          select: { reviews: true, favorites: true }
        }
      }
    });
  } catch (error) {
    console.warn("Database not available, using local data");
    return localTools.filter(t => t.authorId === userId);
  }
}
