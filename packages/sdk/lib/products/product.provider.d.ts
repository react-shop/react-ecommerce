import { TGetProducts } from './product.interface';
export declare const ENDPOINTS: {
    PRODUCTS: string;
};
export interface IProductProvider {
    getProducts: TGetProducts;
}
export declare const ProductProvider: IProductProvider;
