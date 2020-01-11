import { IApiResponse } from '../utils/global.interface';
export interface IProduct {
    name: string;
}
export declare type TGetProducts = () => Promise<IApiResponse<IProduct[]>>;
