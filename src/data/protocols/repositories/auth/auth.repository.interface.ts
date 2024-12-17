import { User } from '@src/domain/entities/user.entity';

export interface IAuthRepository {
  login(
    params: IAuthRepository.LoginInput,
  ): Promise<IAuthRepository.LoginOutput>;
}
export namespace IAuthRepository {
  export interface LoginInput {
    email: string;
    password: string;
  }
  export type LoginOutput = User | null;
}
