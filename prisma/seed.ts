import { PrismaClient } from '@prisma/client';
import * as seeds from './seeds';

const prisma = new PrismaClient({
  log: [{ level: 'error', emit: 'event' }],
});

async function main(): Promise<void> {
  await prisma.$transaction(async (transaction) => {
    await transaction.user.createMany({
      data: await seeds.users(),
    });
  });
}

main()
  .then(() => {
    console.log('Seeds executadas com sucesso!');
  })
  .catch((error) => {
    console.error('Houve algo de errado ao executar as seeds', { error });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
