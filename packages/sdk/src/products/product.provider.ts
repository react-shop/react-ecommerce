import { http as httpClient } from '../utils/httpClient';

import {
  TGetProducts,
} from './product.interface';
import { ENDPOINTS } from '../utils/routes.constants';

export interface IProductProvider {
  getProducts: TGetProducts;
}

export const ProductProvider: IProductProvider = {
  getProducts: async () => httpClient.get(`${ENDPOINTS.PRODUCTS}`),
};
