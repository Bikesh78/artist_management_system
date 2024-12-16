import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "@libs/types";
import { z } from "zod";
import { BASE_URL } from "src/libs/config";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { errorToast, infoToast } from "src/components/ui";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Email must be valid"),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type LoginType = z.infer<typeof loginSchema>;

export const defaultLoginField = {
  email: "",
  password: "",
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginType): Promise<AxiosResponse<LoginResponse>> => {
      return axios.post(`${BASE_URL}/auth/login`, data);
    },
    onSuccess: (data) => {
      localStorage.setItem(
        "artist_access_token",
        JSON.stringify(data.data.access_token),
      );
      localStorage.setItem("artist_mgmt_user", JSON.stringify(data.data.user));
      infoToast("Successfully logged in");
      navigate("/");
    },
    onError: (err: Error | AxiosError<{ message: string }>) => {
      if (err instanceof AxiosError) {
        errorToast(err.response?.data?.message as string);
        return;
      }
      errorToast(err.message);
    },
  });
};