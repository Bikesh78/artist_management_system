import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { LoginType } from "..";
import { LoginResponse } from "@libs/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginType): Promise<AxiosResponse<LoginResponse>> => {
      return axios.post(`${BASE_URL}/auth/login`, data);
    },
  });
};
