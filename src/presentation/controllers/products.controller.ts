import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductsCase } from '@src/data/use-cases/products/get-products.use-case';
import { IGetProductsCase } from '@src/data/use-cases/products/get-products.use-case.dto';
import { AuthGuard } from '../decorators/auth.decorator';

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(
    @Inject(GetProductsCase)
    private readonly getProductsCase: IGetProductsCase,
  ) {}

  @AuthGuard()
  @ApiResponse({ isArray: true, type: IGetProductsCase.Output })
  @Get('/products')
  async get(): Promise<IGetProductsCase.Output[]> {
    return this.getProductsCase.execute();
  }
}
