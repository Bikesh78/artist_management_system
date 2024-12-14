import { GenderEnum } from "@libs/types";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  readonly first_name: string;

  @IsNotEmpty()
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  readonly confirm_password: string;

  @IsOptional()
  readonly phone: string;

  @IsOptional()
  readonly dob: Date;

  @IsOptional()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;

  @IsOptional()
  readonly address: string;
}
