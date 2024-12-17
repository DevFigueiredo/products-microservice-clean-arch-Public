import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
export const products: Prisma.ProductCreateManyInput[] = Array.from({
  length: 30,
}).map(() => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()), // Converte para float
  createdAt: faker.date.past(),
  description: faker.commerce.productDescription(),
  updatedAt: new Date(), // Pode ser a data atual ou outra lógica
}));
