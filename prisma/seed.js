const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@dastiyor.com" },
    update: {},
    create: {
      fullName: "Dastiyor Admin",
      email: "admin@dastiyor.com",
      password: hashed,
      role: "ADMIN",
      isVerified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@dastiyor.com" },
    update: {},
    create: {
      fullName: "Test Customer",
      email: "customer@dastiyor.com",
      password: hashed,
      role: "CUSTOMER",
    },
  });

  const provider = await prisma.user.upsert({
    where: { email: "provider@dastiyor.com" },
    update: {},
    create: {
      fullName: "Test Provider",
      email: "provider@dastiyor.com",
      password: hashed,
      role: "PROVIDER",
      isVerified: true,
    },
  });

  await prisma.task.createMany({
    data: [
      { title: "Sample task 1", description: "First sample", category: "Cleaning", budgetType: "fixed", budgetAmount: "100", city: "Dushanbe", userId: customer.id, status: "OPEN" },
      { title: "Sample task 2", description: "Second sample", category: "Repair", budgetType: "negotiable", city: "Dushanbe", userId: customer.id, status: "IN_PROGRESS" },
    ],
});

  console.log("Seed done:", { admin: admin.email, customer: customer.email, provider: provider.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
