import { Inject, Injectable } from '@nestjs/common';
import { IProductsRepository } from '@src/data/protocols/repositories/products/products.repository.interface';
import { PrismaDb } from 'src/main/config/prisma/prisma-db.config';
@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaDb) {}
  get(
    params?: IProductsRepository.GetProductsInput,
  ): Promise<IProductsRepository.GetProductsOutput> {
    const products = this.prisma.product.findMany();
    return products;
  }
}
