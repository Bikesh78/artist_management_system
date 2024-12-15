import { GenderEnum } from "@libs/types";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  dob: Date;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsOptional()
  address: string;

  @IsOptional()
  first_release_year: string;

  @IsOptional()
  no_of_albums_released: number;
}
