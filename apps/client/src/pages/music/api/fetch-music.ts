import { IMusic, PaginatedResponse } from "@libs/types";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";

export const useFetchMusics = (artistId: string | undefined, page: number) => {
  return useQuery({
    queryKey: ["musics", page],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<PaginatedResponse<IMusic[]>>(
          `/artist/${artistId}/music?page=${page}&limit=10`,
        );

        return data;
      } catch (err: any) {
        errorToast(err?.response?.data?.message || err?.message);
      }
    },
    enabled: Boolean(artistId),
    placeholderData: (prev) => prev,
  });
};
