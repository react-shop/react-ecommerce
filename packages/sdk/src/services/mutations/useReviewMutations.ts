import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../providers/ApiProvider";
import type {
  Review,
  CreateReviewInput,
  UpdateReviewInput,
  ModerateReviewInput,
} from "../../entities";

export function useCreateReview() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateReviewInput) => {
      const response = await client.post<Review>("/api/reviews", input);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", data.productId],
      });
    },
  });
}

export function useUpdateReview() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateReviewInput;
    }) => {
      const response = await client.put<Review>(`/api/reviews/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", data.productId],
      });
    },
  });
}

export function useDeleteReview() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await client.delete(`/api/reviews/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useModerateReview() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ModerateReviewInput;
    }) => {
      const response = await client.put<Review>(
        `/api/reviews/${id}/moderate`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", data.productId],
      });
    },
  });
}
