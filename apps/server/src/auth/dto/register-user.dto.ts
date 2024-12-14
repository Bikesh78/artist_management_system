import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
// import {GenderEnum} from "@libs/models"

export class RegisterUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  dob: Date;
  

  // @IsOptional()
  // gender: GenderEnum

}
