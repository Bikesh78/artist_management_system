import { IArtist, PaginatedResponse } from "@libs/types";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";

export const useFetchArtists= (page: number) => {
  return useQuery({
    queryKey: ["artists", page],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<PaginatedResponse<IArtist[]>>(
          `/artist?page=${page}&limit=10`,
        );
        return data;
      } catch (err: any) {
        errorToast(err?.response?.data?.message || err?.message);
      }
    },
    placeholderData: (prev) => prev,
  });
};
