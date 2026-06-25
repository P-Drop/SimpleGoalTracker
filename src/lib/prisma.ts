import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { PrismaClient } from "../../generated/prisma/client.js";

expand(config())

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma