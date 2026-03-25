import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('開始填充數據庫...');

  // 創建分類
  const categories = [
    { slug: 'math', nameEn: 'Mathematics', nameZh: '數學', icon: 'Calculator', sortOrder: 1 },
    { slug: 'chinese', nameEn: 'Chinese', nameZh: '中文', icon: 'BookText', sortOrder: 2 },
    { slug: 'english', nameEn: 'English', nameZh: '英文', icon: 'Languages', sortOrder: 3 },
    { slug: 'science', nameEn: 'Science', nameZh: '科學', icon: 'FlaskConical', sortOrder: 4 },
    { slug: 'programming', nameEn: 'Programming', nameZh: '編程', icon: 'Code', sortOrder: 5 },
    { slug: 'admin', nameEn: 'Administration', nameZh: '行政', icon: 'ClipboardList', sortOrder: 6 },
    { slug: 'classroom', nameEn: 'Classroom Management', nameZh: '課堂管理', icon: 'Users', sortOrder: 7 },
    { slug: 'ai', nameEn: 'AI Assist', nameZh: 'AI 輔助', icon: 'Sparkles', sortOrder: 8 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('✅ 分類填充完成');

  // 創建示例工具
  const mathCategory = await prisma.category.findUnique({ where: { slug: 'math' } });
  const chineseCategory = await prisma.category.findUnique({ where: { slug: 'chinese' } });
  const classroomCategory = await prisma.category.findUnique({ where: { slug: 'classroom' } });
  const adminCategory = await prisma.category.findUnique({ where: { slug: 'admin' } });

  if (mathCategory && chineseCategory && classroomCategory && adminCategory) {
    // 創建示例用戶
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@teachertoolbox.hk' },
      update: {},
      create: {
        email: 'demo@teachertoolbox.hk',
        name: '示例老師',
        role: 'TEACHER',
        school: '示例學校',
      },
    });

    const tools = [
      {
        slug: 'multiplication-practice',
        titleEn: 'Multiplication Practice',
        titleZh: '乘法表練習器',
        descEn: 'Interactive multiplication table practice for primary students',
        descZh: '互動式乘法表練習，適合小學生使用',
        externalUrl: 'https://example.com/multiplication',
        categoryId: mathCategory.id,
        authorId: demoUser.id,
        gradeLevels: ['P1', 'P2', 'P3'],
        tags: ['乘法', '練習', '小學'],
        viewCount: 1205,
      },
      {
        slug: 'vocabulary-cards',
        titleEn: 'Vocabulary Card Generator',
        titleZh: '生字卡生成器',
        descEn: 'Generate printable vocabulary cards with Chinese characters',
        descZh: '生成可打印的中文生字卡，支持自訂字體和格式',
        externalUrl: 'https://example.com/vocab-cards',
        categoryId: chineseCategory.id,
        authorId: demoUser.id,
        gradeLevels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
        tags: ['生字', '打印', '中文'],
        viewCount: 892,
      },
      {
        slug: 'classroom-timer',
        titleEn: 'Classroom Timer',
        titleZh: '課堂計時器',
        descEn: 'Visual timer for classroom activities with sound alerts',
        descZh: '視覺化課堂計時器，帶聲音提示，適合小組活動',
        externalUrl: 'https://example.com/timer',
        categoryId: classroomCategory.id,
        authorId: demoUser.id,
        gradeLevels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3'],
        tags: ['計時器', '課堂管理', '視覺化'],
        viewCount: 2341,
      },
      {
        slug: 'random-grouping',
        titleEn: 'Random Grouping Tool',
        titleZh: '隨機分組工具',
        descEn: 'Quickly divide students into random groups',
        descZh: '快速將學生分成隨機小組，支持多種分組方式',
        externalUrl: 'https://example.com/grouping',
        categoryId: adminCategory.id,
        authorId: demoUser.id,
        gradeLevels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3'],
        tags: ['分組', '隨機', '行政'],
        viewCount: 1567,
      },
    ];

    for (const tool of tools) {
      await prisma.tool.upsert({
        where: { slug: tool.slug },
        update: {},
        create: tool,
      });
    }

    console.log('✅ 示例工具填充完成');
  }

  console.log('數據庫填充完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
