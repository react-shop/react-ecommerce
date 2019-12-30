export interface IProduct {
  name: string;
}

export type TGetProducts = (
) => Promise<IProduct[]>;
