import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";

export const useDeleteArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return axiosInstance.delete(`${BASE_URL}/artist/${id}`);
    },
    onSuccess: () => {
      successToast("Artist deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
