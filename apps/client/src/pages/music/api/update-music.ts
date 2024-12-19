import { ResponseError } from "@libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "src/components/ui";
import { axiosInstance } from "src/libs/axios-client";
import { BASE_URL } from "src/libs/config";
import { z } from "zod";

export const updateMusicSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  album_name: z.string().nonempty({ message: "Album name is required" }),
  // genre: z.nativeEnum(GenreEnum),
  genre: z.enum(["rnb", "country", "classic", "rock", "jazz"], {
    message: "Genre is required",
  }),
  artist_id: z.number(),
  id: z.number(),
});

export type UpdateMusicInput = z.infer<typeof updateMusicSchema>;

export const useUpdateMusic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMusicInput) => {
      return axiosInstance.patch(`${BASE_URL}/music/${data.id}`, data);
    },
    onSuccess: () => {
      successToast("Music updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["musics"],
      });
    },
    onError: (err: ResponseError) => {
      errorToast(err.response?.data?.message || err.message);
    },
  });
};
