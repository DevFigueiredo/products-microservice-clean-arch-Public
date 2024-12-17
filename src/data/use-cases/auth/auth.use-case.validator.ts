import { BaseValidator } from '@src/data/protocols/validators/base.validator';
import { z } from 'zod';
import { IAuthUseCase } from './auth.use-case.dto';

export class AuthUseCaseValidator extends BaseValidator<
  Partial<IAuthUseCase.Input>
> {
  protected schema = z.object({
    email: z.string(),
    password: z.string(),
  });
}
