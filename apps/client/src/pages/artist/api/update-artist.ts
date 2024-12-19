import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const updateArtistSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  dob: z.string().nonempty("Date of birth is required"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().nonempty({ message: "Address is required" }),
  first_release_year: z
    .string()
    .nonempty({ message: "This field is required" }),
  no_of_albums_released: z
    .string()
    .nonempty({ message: "This field is required" }),
  id: z.number(),
});

export type UpdateArtistInput = z.infer<typeof updateArtistSchema>;

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateArtistInput) => {
      return axiosInstance.patch(`${BASE_URL}/artist/${data.id}`, data);
    },
    onSuccess: () => {
      successToast("Artist updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["artists"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
