import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // إذا كنا في مرحلة الـ Build ولم يكن الرابط متاحاً بالكامل، نمرر رابطاً وهمياً مؤقتاً لتخطي التجميع بسلام
  const databaseUrl = process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock?sslmode=require"

  return new PrismaClient({
    datasourceUrl: databaseUrl,
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
