import { Prisma } from '@prisma/client';
import { BCryptPassword } from '../../src/utils/bcrypt-password.utils';
export const users = async (): Promise<Prisma.UserCreateManyInput[]> => {
  const password = await new BCryptPassword().hashPassword('adminPassword123');
  return [
    {
      email: 'admin@admin.com.br',
      name: 'Admin User',
      password,
    },
  ];
};
