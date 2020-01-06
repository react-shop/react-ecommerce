import { ProductProvider } from '../../src/products/product.provider';
import { ProductSchema } from '../../src/products/product.schema';

describe('Integration | Test get product', () => {
  it('should be return all products', async () => {
    const response = ProductProvider.getProducts();

    const isValidSchema = await ProductSchema.isValid(response);

    expect(isValidSchema).toBe(true);
    expect(response.length).toBeGreaterThan(1);
  });
});
