import { IApiResponse } from '../utils/global.interface';

export interface IProduct {
  name: string;
}

export type TGetProducts = (
) => Promise<IApiResponse<IProduct[]>>;
