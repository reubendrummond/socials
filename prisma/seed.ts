import { PrismaClient } from "@prisma/client";
import { customers } from "./data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.customer.createMany({
      data: customers,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

load();
