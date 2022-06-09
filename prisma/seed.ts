import { PrismaClient } from "@prisma/client";
import { users } from "./data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: users,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

load();
