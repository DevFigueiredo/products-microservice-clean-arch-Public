import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/data/protocols/repositories/auth/auth.repository.interface';
import { PrismaDb } from 'src/main/config/prisma/prisma-db.config';
import bcrypt from 'bcrypt';
import { IPasswordUtils } from '@src/data/protocols/utils/password.util';
import { BCryptPassword } from '@src/utils/bcrypt-password.utils';
@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly prisma: PrismaDb,
    @Inject(BCryptPassword) private readonly cryptPassword: IPasswordUtils,
  ) {}
  async login(
    params: IAuthRepository.LoginInput,
  ): Promise<IAuthRepository.LoginOutput> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: params.email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.cryptPassword.comparePasswords(
      params.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return user;
  }
}
