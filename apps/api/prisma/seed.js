const { PrismaClient } = require("@prisma/client");
const { COMMUNES, REGIONS, REQUEST_TYPES, REQUEST_STATUS } = require("./data");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  console.log("⏳ Start seeding...");

  const communeType = await prisma.collectiviteType.create({
    data: { collectTypeLabel: "Commune" },
  });

  const regionType = await prisma.collectiviteType.create({
    data: { collectTypeLabel: "Région" },
  });

  await prisma.collectivite.createMany({
    data: COMMUNES.map((name) => ({
      collectName: name,
      collectTypeId: communeType.collectTypeId,
    })),
  });

  await prisma.collectivite.createMany({
    data: REGIONS.map((name) => ({
      collectName: name,
      collectTypeId: regionType.collectTypeId,
    })),
  });

  await prisma.requestType.createMany({
    data: REQUEST_TYPES.map((requestType) => ({ reqTypeLabel: requestType })),
  });

  await prisma.requestStatus.createMany({
    data: REQUEST_STATUS.map((requestStatus) => ({
      reqStatusLabel: requestStatus,
    })),
  });

  await prisma.user.create({
    data: {
      firstname: "Optimus",
      lastname: "Prime",
      role: "ADMIN",
      email: "admin@e.co",
      password: await bcrypt.hash("admin", 10),
      passChangedAt: new Date(),
      passMaxAge: 0,
      collectId: 7,
    },
  });
}

seed()
  .then((_) => {
    console.log("✔ Seeding completed!");
  })
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
