export interface Tool {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  externalUrl: string;
  thumbnail: string | null;
  status: 'PUBLISHED' | 'HIDDEN' | 'UNDER_REVIEW';
  viewCount: number;
  gradeLevels: string[];
  subjects: string[];
  tags: string[];
  instructions: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  category: {
    id: string;
    nameEn: string;
    nameZh: string;
    slug: string;
  };
  _count?: {
    reviews: number;
    favorites: number;
  };
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  icon: string | null;
  sortOrder: number;
  _count?: {
    tools: number;
  };
}

export interface Request {
  id: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  gradeLevels: string[];
  subjects: string[];
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  claimedById: string | null;
  completedToolId: string | null;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  claimedBy?: {
    id: string;
    name: string;
  } | null;
  completedTool?: {
    id: string;
    slug: string;
    titleEn: string;
    titleZh: string;
  } | null;
  hasVoted?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string | null;
  role: 'TEACHER' | 'CREATOR' | 'ADMIN';
  school: string | null;
  subjects: string[];
}
