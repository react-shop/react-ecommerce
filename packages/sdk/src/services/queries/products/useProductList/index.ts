import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@providers/ApiProvider";
import { useProductListKey } from "./key";
import { fetchProductList } from "./request";

export function useMe() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: useProductListKey(),
    queryFn: () => fetchProductList(client),
    retry: false,
  });
}

export * from "./types";
export * from "./key";
