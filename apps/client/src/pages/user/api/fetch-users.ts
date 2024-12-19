import { IUser, PaginatedResponse } from "@libs/types";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";

export const useFetchUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      try {
        const { data } =
          await axiosInstance.get<PaginatedResponse<IUser[]>>(`/user?page=${page}&limit=10`);
        return data;
      } catch (err: any) {
        errorToast(err?.response?.data?.message || err?.message);
      }
    },
  });
};
