import type { AxiosInstance } from "axios";
import { PRODUCT_ROUTES } from "@services/constants";
import type { UseProductListResponse } from "./types";

export const fetchProductList = async (
  client: AxiosInstance
): Promise<UseProductListResponse> => {
  const response = await client.get<UseProductListResponse>(
    PRODUCT_ROUTES.list
  );
  return response.data;
};
