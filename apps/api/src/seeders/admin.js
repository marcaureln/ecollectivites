const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function addAdmin() {
  console.log('⏳ Adding admin...');

  const firstname = process.env.npm_config_firstname;
  const lastname = process.env.npm_config_lastname;
  const collectId = parseInt(process.env.npm_config_collectid);
  const email = process.env.npm_config_email;

  await prisma.user.create({
    data: {
      firstname,
      lastname,
      collectId,
      email,
      role: 'ADMIN',
      password: await bcrypt.hash('admin', 10),
      passChangedAt: new Date(),
      passMaxAge: 0,
    },
  });
}

addAdmin()
  .then((_) => {
    console.log('✔ Admin added successfully, default password: admin');
  })
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
