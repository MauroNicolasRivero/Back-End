import { faker } from "@faker-js/faker";

const mockProducts = []
for (let i = 0; i < 100; i++) {
    mockProducts.push({
        id: faker.string.uuid(),
        product: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn(),
        price: faker.commerce.price({min:1000, max: 5000}),
        status: faker.datatype.boolean(),
        stock: faker.number.int({min:0, max: 50}),
        category: faker.commerce.department(),
        thumbnails: faker.internet.emoji()

    })
}

// ----------------------------------------------------------------

export class MockProductDao {
  getAll() {
    return mockProducts
  }
}
