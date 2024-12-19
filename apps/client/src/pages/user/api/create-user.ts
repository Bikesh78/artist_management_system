import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const createUserSchema = z
  .object({
    first_name: z.string().default(""),
    last_name: z.string().nonempty({ message: "Last name is required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email("Email must be valid"),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    phone: z.string().optional(),
    dob: z.string(),
    gender: z.enum(["m", "f", "o"]),
    address: z.string().optional(),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const defaultCreateUserFields = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  gender: undefined,
  dob: "",
  address: "",
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => {
      return axiosInstance.post(`${BASE_URL}/user`, data);
    },
    onSuccess: () => {
      successToast("User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
