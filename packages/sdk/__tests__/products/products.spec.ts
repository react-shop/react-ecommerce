import { ProductProvider } from '../../src/products/product.provider';
import { ProductsSchema } from '../../src/products/product.schema';

describe('Integration | Test get product', () => {
  it('should be return all products', async () => {
    const { data } = await ProductProvider.getProducts();

    const isValidSchema = await ProductsSchema.isValid(data);

    expect(isValidSchema).toBe(true);
    expect(data.length).toBeGreaterThan(1);
  });
});
