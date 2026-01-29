import { PrismaClient } from '@prisma/client'

const prismadbLine = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismadbLine>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismadbLine()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
