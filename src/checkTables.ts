import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const foods = await prisma.food.findMany();
  const categories = await prisma.category.findMany();

  console.log("Users:", users);
  console.log("Foods:", foods);
  console.log("Categories:", categories);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
