import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "src/components/ui";
import { ResponseError } from "@libs/types";

export const registerSchema = z
  .object({
    first_name: z.string().nonempty({ message: "First name is required" }),
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

export type RegisterType = z.infer<typeof registerSchema>;

export const defaultRegisterFields = {
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

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterType): Promise<AxiosResponse<any>> => {
      return axios.post(`${BASE_URL}/auth/register`, data);
    },
    onSuccess: () => {
      successToast("Registration successful");
      navigate("/");
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
