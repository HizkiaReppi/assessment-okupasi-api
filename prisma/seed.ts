import {PrismaClient} from '@prisma/client';
import {v4 as uuid} from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // insert super user
  await prisma.$executeRaw`
    INSERT INTO
      "user" (id, is_super, nama, email, password, updated_at)
    VALUES
      (
        ${uuid()},
        true,
        'SUPER',
        'super@gmail.com',
        '$2a$12$XH3qEeFA0Mi7..C.2IIWa.8epPmbBU7cusC8rOtvOHTT/HIF35xvK',
        ${new Date()}
      );
  `;
}

main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
