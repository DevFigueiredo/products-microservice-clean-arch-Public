import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IGetProductsCase } from './get-products.use-case.dto';
import { IProductsRepository } from '@src/data/protocols/repositories/products/products.repository.interface';
import { ProductsRepository } from '@src/infra/db/products/products.repository';

@Injectable()
export class GetProductsCase implements IGetProductsCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<IGetProductsCase.Output[]> {
    const products = await this.productsRepository.get();
    return products;
  }
}
