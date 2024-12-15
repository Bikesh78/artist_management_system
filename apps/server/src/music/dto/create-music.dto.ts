import { GenreEnum } from "@libs/types";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateMusicDto {
  @IsNotEmpty()
  artist_id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  album_name: string;

  @IsNotEmpty()
  @IsEnum(GenreEnum)
  genre: GenreEnum;
}
