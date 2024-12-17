import { Module } from '@nestjs/common';
import { AuthUseCase } from '@src/data/use-cases/auth/auth.use-case';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';
import { AuthRepository } from '@src/infra/db/auth/auth.repository';
import { AuthController } from '@src/presentation/controllers/auth.controller';
import { PrismaDb } from '../config/prisma/prisma-db.config';
import { BCryptPassword } from '@src/utils/bcrypt-password.utils';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    AuthRepository,
    JwtTokenAdapter,
    PrismaDb,
    { provide: BCryptPassword, useValue: new BCryptPassword() },
    {
      provide: JwtTokenAdapter,
      useValue: new JwtTokenAdapter(process.env.PASSWORD_HASH),
    },
  ],
})
export class AppModule {}
