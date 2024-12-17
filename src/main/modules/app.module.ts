import { BadGatewayException, Module } from '@nestjs/common';
import { AuthUseCase } from '@src/data/use-cases/auth/auth.use-case';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';
import { AxiosHttpClient } from '@src/infra/adapters/axios-http-adapter';
import { AuthController } from '@src/presentation/controllers/auth.controller';
import { PrismaDb } from '../config/prisma/prisma-db.config';
import { BCryptPassword } from '@src/utils/bcrypt-password.utils';
import { ProductsRepository } from '@src/infra/db/products/products.repository';
import { ProductsController } from '@src/presentation/controllers/products.controller';
import { GetProductsCase } from '@src/data/use-cases/products/get-products.use-case';

@Module({
  imports: [],
  controllers: [AuthController, ProductsController],
  providers: [
    AuthUseCase,
    GetProductsCase,
    ProductsRepository,
    JwtTokenAdapter,
    PrismaDb,
    {
      provide: AxiosHttpClient,
      useFactory: () => {
        const httpClient = new AxiosHttpClient();
        httpClient.addResponseInterceptor(
          (response: any) => {
            return response;
          },
          (error) => {
            console.error(error);
            throw new BadGatewayException('External service http client error');
          },
        );
        return httpClient;
      },
    },
    { provide: BCryptPassword, useValue: new BCryptPassword() },
    {
      provide: JwtTokenAdapter,
      useValue: new JwtTokenAdapter(process.env.PASSWORD_HASH),
    },
  ],
})
export class AppModule {}
