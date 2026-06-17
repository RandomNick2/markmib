import { PrismaClient, UserRole } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SUPERUSER_USERNAME || 'admin';
  const password = process.env.SUPERUSER_PASSWORD || 'admin123';
  const firstName = process.env.SUPERUSER_FIRST_NAME || 'Admin';
  const lastName = process.env.SUPERUSER_LAST_NAME || 'User';

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const user = await prisma.user.upsert({
    where: { username },
    update: {
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      username,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  console.log(`Superuser is ready: ${user.username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
