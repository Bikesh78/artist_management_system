import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";

export const useImportArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formdata: FormData) => {
      return axiosInstance.post(`/artist/import`, formdata);
    },
    onSuccess: (res) => {
      successToast(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
