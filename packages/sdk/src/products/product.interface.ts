interface IApiResponse<T> {
  data: T;
}

export interface IProduct {
  name: string;
}

export type TGetProducts = (
) => Promise<IApiResponse<IProduct[]>>;
