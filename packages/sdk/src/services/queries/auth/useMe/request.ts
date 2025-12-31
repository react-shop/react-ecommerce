import type { AxiosInstance } from "axios";
import { AUTH_ROUTES } from "@services/constants";
import type { UseMeResponse } from "./types";

export const fetchMe = async (
  client: AxiosInstance
): Promise<UseMeResponse> => {
  const response = await client.get<UseMeResponse>(AUTH_ROUTES.ME);
  return response.data;
};
