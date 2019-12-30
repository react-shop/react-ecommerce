import { http as httpClient } from '../utils/httpClient';

import {
  TGetProducts,
} from './product.interface';

const ROOT_PRODUCTS = '/products';

export const ENDPOINTS = {
  PRODUCTS: `${ROOT_PRODUCTS}`,
};

export interface IProductProvider {
  getProducts: TGetProducts;
}

export const ProductProvider: IProductProvider = {
  getProducts: async () => httpClient.get(`${ENDPOINTS.PRODUCTS}`),
};
