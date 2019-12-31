export interface IProduct {
  name: string;
}
export declare type TGetProducts = () => Promise<IProduct[]>;
