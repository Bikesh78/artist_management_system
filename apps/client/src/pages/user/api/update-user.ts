import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const updateUserSchema = z.object({
  first_name: z.string().nonempty({ message: "First name is required" }),
  last_name: z.string().nonempty({ message: "Last name is required" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Email must be valid"),
  phone: z.string().optional(),
  dob: z.string(),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().optional(),
  id: z.number(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInput) => {
      return axiosInstance.patch(`${BASE_URL}/user/${data.id}`, data);
    },
    onSuccess: () => {
      successToast("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
