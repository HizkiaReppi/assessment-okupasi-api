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
        '${uuid()}',
        true,
        'SUPER',
        'super@gmail.com',
        '$2a$12$6ttmUEf4WDLGnUTsA6wmeus6jGwXUO8rKoToA5u1n9z7aE2Iymes4Ia',
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
