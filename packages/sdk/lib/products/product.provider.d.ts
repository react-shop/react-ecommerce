import { TGetProducts } from './product.interface';
export interface IProductProvider {
    getProducts: TGetProducts;
}
export declare const ProductProvider: IProductProvider;
