import { ApiProperty } from '@nestjs/swagger';

export interface IAuthUseCase {
  execute(data: IAuthUseCase.Input): Promise<IAuthUseCase.Output>;
}

export namespace IAuthUseCase {
  export class Input {
    @ApiProperty({
      example: 'admin@admin.com.br',
    })
    email: string;
    @ApiProperty({
      example: 'adminPassword123',
    })
    password: string;
  }
  export class Output {
    @ApiProperty()
    token: string;
  }
}
