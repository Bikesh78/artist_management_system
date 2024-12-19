import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const createArtistSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  dob: z.string().nonempty("Date of birth is required"),
  gender: z.enum(["m", "f", "o"], { message: "Gender is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  first_release_year: z
    .string()
    .nonempty({ message: "This field is required" }),
  no_of_albums_released: z
    .string()
    .nonempty({ message: "This field is required" }),
});

export type CreateArtistInput = z.infer<typeof createArtistSchema>;

export const defaultCreateArtistFields = {
  name: "",
  gender: undefined,
  dob: "",
  address: "",
  first_release_year: "",
  no_of_albums_released: undefined,
};

export const useCreateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArtistInput) => {
      return axiosInstance.post(`${BASE_URL}/artist`, data);
    },
    onSuccess: () => {
      successToast("Artist created successfully");
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
