import { http as httpClient } from '../utils/httpClient';

import {
  TGetProducts,
} from './product.interface';

const ROOT_PRODUCTS = '/products';

export const ENDPOINTS = {
  PRODUCTS: `${ROOT_PRODUCTS}`,
};

export const getProducts: TGetProducts = async () => httpClient.get(`${ENDPOINTS.PRODUCTS}`);
