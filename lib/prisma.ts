// Mock Prisma client for build time when database is not available
class MockPrismaClient {
  user = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock', ...data.data }),
  };
  tool = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock', ...data.data }),
    update: async () => null,
  };
  category = {
    findUnique: async () => null,
    findMany: async () => [],
  };
  review = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock', ...data.data }),
  };
  favorite = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock', ...data.data }),
    delete: async () => null,
  };
  request = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock', ...data.data }),
    update: async () => null,
  };
  requestVote = {
    findUnique: async () => null,
    create: async (data: any) => ({ id: 'mock', ...data.data }),
    delete: async () => null,
  };
  report = {
    create: async (data: any) => ({ id: 'mock', ...data.data }),
  };
}

// Try to import real Prisma, fallback to mock
let prisma: any;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  console.warn('Prisma not available, using mock client');
  prisma = new MockPrismaClient();
}

export { prisma };
export default prisma;
