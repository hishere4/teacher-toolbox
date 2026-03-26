import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Category operations
export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { tools: true }
      }
    }
  });
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
  
  return prisma.tool.findMany({
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
}

export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({
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
}

export async function incrementToolViews(slug: string) {
  return prisma.tool.update({
    where: { slug },
    data: { viewCount: { increment: 1 } }
  });
}

export async function createTool(data: any) {
  return prisma.tool.create({
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
}

export async function getToolsByUser(userId: string) {
  return prisma.tool.findMany({
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
}
