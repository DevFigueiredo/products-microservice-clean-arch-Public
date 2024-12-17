import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthUseCase } from './auth.use-case.dto';
import { AuthUseCaseValidator } from './auth.use-case.validator';
import { AxiosHttpClient } from '@src/infra/adapters/axios-http-adapter';
import { IHttpClient } from '@src/data/protocols/adapters/http-adapter.interface';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    @Inject(AxiosHttpClient) private readonly htpClient: IHttpClient,
  ) {}

  async execute(data: IAuthUseCase.Input): Promise<IAuthUseCase.Output> {
    new AuthUseCaseValidator().validate(data);
    const respone = await this.htpClient.post<IAuthUseCase.Output>(
      `${process.env.MICROSERVICE_AUTH_URL}/login`,
      {
        email: data.email,
        password: data.password,
      },
    );

    return respone;
  }
}
