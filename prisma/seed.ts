import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

//This script is a seed script, i.e. a script for initial database filling. It is used to create an initial (super) administrator when the project is first launched.
async function main() {
  const adminEmail = "super@admin.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("1234", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log(`Created admin user: ${admin.name} (${admin.email})`);
  } else {
    console.log(`Admin user already exists: ${existingAdmin.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
