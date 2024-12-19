import { GenreEnum, ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const createMusicSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  album_name: z.string().nonempty({ message: "Album name is required" }),
  // genre: z.nativeEnum(GenreEnum),
  genre: z.enum(["rnb", "country", "classic", "rock", "jazz"], {
    message: "Genre is required",
  }),
  artist_id: z.number().optional(),
});

export type CreateMusicInput = z.infer<typeof createMusicSchema>;

export const defaultCreateMusicFields = {
  title: "",
  album_name: "",
  genre: undefined,
  artist_id: undefined,
};

export const useCreateMusic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMusicInput) => {
      return axiosInstance.post(`${BASE_URL}/music`, data);
    },
    onSuccess: () => {
      successToast("Music created successfully");
      queryClient.invalidateQueries({
        queryKey: ["musics"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
