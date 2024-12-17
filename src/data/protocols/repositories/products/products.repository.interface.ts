import { Product } from '@src/domain/entities/products.entity';

export interface IProductsRepository {
  get(
    params?: IProductsRepository.GetProductsInput,
  ): Promise<IProductsRepository.GetProductsOutput>;
}
export namespace IProductsRepository {
  export type GetProductsInput = {};
  export type GetProductsOutput = Product[];
}
