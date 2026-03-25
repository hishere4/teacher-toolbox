// In-memory database for Phase 3 development
// Will be replaced with Prisma + PostgreSQL in production

import { Tool, Category, User } from "@/types";

// Sample users
export const users: User[] = [
  {
    id: "1",
    email: "teacher@example.com",
    name: "陳老師",
    image: null,
    role: "TEACHER",
    school: "香港小學",
    subjects: ["math", "chinese"],
  },
  {
    id: "2",
    email: "creator@example.com",
    name: "李開發者",
    image: null,
    role: "CREATOR",
    school: null,
    subjects: ["programming"],
  },
];

// Sample categories
export const categories: Category[] = [
  { id: "1", slug: "math", nameEn: "Mathematics", nameZh: "數學", icon: "Calculator", sortOrder: 1, _count: { tools: 3 } },
  { id: "2", slug: "chinese", nameEn: "Chinese", nameZh: "中文", icon: "BookText", sortOrder: 2, _count: { tools: 2 } },
  { id: "3", slug: "english", nameEn: "English", nameZh: "英文", icon: "Languages", sortOrder: 3, _count: { tools: 1 } },
  { id: "4", slug: "science", nameEn: "Science", nameZh: "科學", icon: "FlaskConical", sortOrder: 4, _count: { tools: 1 } },
  { id: "5", slug: "programming", nameEn: "Programming", nameZh: "編程", icon: "Code", sortOrder: 5, _count: { tools: 2 } },
  { id: "6", slug: "admin", nameEn: "Administration", nameZh: "行政", icon: "ClipboardList", sortOrder: 6, _count: { tools: 2 } },
  { id: "7", slug: "classroom", nameEn: "Classroom Management", nameZh: "課堂管理", icon: "Users", sortOrder: 7, _count: { tools: 1 } },
  { id: "8", slug: "ai", nameEn: "AI Assist", nameZh: "AI 輔助", icon: "Sparkles", sortOrder: 8, _count: { tools: 1 } },
];

// Sample tools
export const tools: Tool[] = [
  {
    id: "1",
    slug: "multiplication-practice",
    titleEn: "Multiplication Practice",
    titleZh: "乘法表練習器",
    descEn: "Interactive multiplication table practice for primary students",
    descZh: "互動式乘法表練習，適合小學生使用",
    externalUrl: "https://example.com/multiplication",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 1205,
    gradeLevels: ["P1", "P2", "P3"],
    subjects: ["math"],
    tags: ["乘法", "練習", "小學"],
    instructions: "點擊開始按鈕，輸入答案後按確認",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
    authorId: "1",
    categoryId: "1",
    author: { id: "1", name: "陳老師", image: null },
    category: { id: "1", nameEn: "Mathematics", nameZh: "數學", slug: "math" },
    _count: { reviews: 5, favorites: 12 },
  },
  {
    id: "2",
    slug: "vocabulary-cards",
    titleEn: "Vocabulary Card Generator",
    titleZh: "生字卡生成器",
    descEn: "Generate printable vocabulary cards with Chinese characters",
    descZh: "生成可打印的中文生字卡，支持自訂字體和格式",
    externalUrl: "https://example.com/vocab-cards",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 892,
    gradeLevels: ["P1", "P2", "P3", "P4", "P5", "P6"],
    subjects: ["chinese"],
    tags: ["生字", "打印", "中文"],
    instructions: "輸入生字，選擇模板，下載PDF",
    createdAt: "2024-03-18T14:30:00Z",
    updatedAt: "2024-03-19T09:15:00Z",
    authorId: "2",
    categoryId: "2",
    author: { id: "2", name: "李開發者", image: null },
    category: { id: "2", nameEn: "Chinese", nameZh: "中文", slug: "chinese" },
    _count: { reviews: 3, favorites: 8 },
  },
  {
    id: "3",
    slug: "classroom-timer",
    titleEn: "Classroom Timer",
    titleZh: "課堂計時器",
    descEn: "Visual timer for classroom activities with sound alerts",
    descZh: "視覺化課堂計時器，帶聲音提示，適合小組活動",
    externalUrl: "https://example.com/timer",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 2341,
    gradeLevels: ["P1", "P2", "P3", "P4", "P5", "P6", "S1", "S2", "S3"],
    subjects: ["classroom"],
    tags: ["計時器", "課堂管理", "視覺化"],
    instructions: "設置時間，點擊開始",
    createdAt: "2024-03-15T08:00:00Z",
    updatedAt: "2024-03-15T08:00:00Z",
    authorId: "1",
    categoryId: "7",
    author: { id: "1", name: "陳老師", image: null },
    category: { id: "7", nameEn: "Classroom Management", nameZh: "課堂管理", slug: "classroom" },
    _count: { reviews: 8, favorites: 25 },
  },
  {
    id: "4",
    slug: "random-grouping",
    titleEn: "Random Grouping Tool",
    titleZh: "隨機分組工具",
    descEn: "Quickly divide students into random groups",
    descZh: "快速將學生分成隨機小組，支持多種分組方式",
    externalUrl: "https://example.com/grouping",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 1567,
    gradeLevels: ["P1", "P2", "P3", "P4", "P5", "P6", "S1", "S2", "S3"],
    subjects: ["admin"],
    tags: ["分組", "隨機", "行政"],
    instructions: "輸入學生名單，選擇每組人數",
    createdAt: "2024-03-10T16:20:00Z",
    updatedAt: "2024-03-12T11:30:00Z",
    authorId: "2",
    categoryId: "6",
    author: { id: "2", name: "李開發者", image: null },
    category: { id: "6", nameEn: "Administration", nameZh: "行政", slug: "admin" },
    _count: { reviews: 4, favorites: 15 },
  },
  {
    id: "5",
    slug: "science-lab-simulator",
    titleEn: "Virtual Science Lab",
    titleZh: "虛擬科學實驗室",
    descEn: "Virtual science experiments for remote learning",
    descZh: "虛擬科學實驗，適合遠程教學和課堂演示",
    externalUrl: "https://example.com/science-lab",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 756,
    gradeLevels: ["S1", "S2", "S3"],
    subjects: ["science"],
    tags: ["科學", "實驗", "虛擬"],
    instructions: "選擇實驗，跟隨步驟操作",
    createdAt: "2024-03-05T09:00:00Z",
    updatedAt: "2024-03-08T14:20:00Z",
    authorId: "2",
    categoryId: "4",
    author: { id: "2", name: "李開發者", image: null },
    category: { id: "4", nameEn: "Science", nameZh: "科學", slug: "science" },
    _count: { reviews: 2, favorites: 6 },
  },
  {
    id: "6",
    slug: "python-code-runner",
    titleEn: "Python Code Runner",
    titleZh: "Python 代碼執行器",
    descEn: "Simple Python code runner for teaching programming basics",
    descZh: "簡易 Python 代碼執行環境，適合編程入門教學",
    externalUrl: "https://example.com/python",
    thumbnail: null,
    status: "PUBLISHED",
    viewCount: 543,
    gradeLevels: ["S1", "S2", "S3"],
    subjects: ["programming"],
    tags: ["Python", "編程", "代碼"],
    instructions: "輸入 Python 代碼，點擊執行",
    createdAt: "2024-03-01T11:00:00Z",
    updatedAt: "2024-03-01T11:00:00Z",
    authorId: "2",
    categoryId: "5",
    author: { id: "2", name: "李開發者", image: null },
    category: { id: "5", nameEn: "Programming", nameZh: "編程", slug: "programming" },
    _count: { reviews: 3, favorites: 9 },
  },
];

// Helper functions
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return tools.filter((t) => t.categoryId === category.id);
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.titleZh.toLowerCase().includes(lowerQuery) ||
      t.titleEn.toLowerCase().includes(lowerQuery) ||
      t.descZh.toLowerCase().includes(lowerQuery) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getPopularTools(limit: number = 4): Tool[] {
  return [...tools].sort((a, b) => b.viewCount - a.viewCount).slice(0, limit);
}

export function getLatestTools(limit: number = 4): Tool[] {
  return [...tools]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
