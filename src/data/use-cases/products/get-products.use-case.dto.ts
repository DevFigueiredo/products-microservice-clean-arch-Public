import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/domain/entities/products.entity';

export interface IGetProductsCase {
  execute(): Promise<IGetProductsCase.Output[]>;
}

export namespace IGetProductsCase {
  export class Output extends Product {}
}
