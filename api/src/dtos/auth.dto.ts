import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class LoginPayloadDto {
  @IsString({ message: "username must be a string" })
  @IsNotEmpty({ message: "username is required" })
  @MinLength(3, {
    message: "username must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "username must be shorter than or equal to 20 characters",
  })
  username: string;

  @IsString({ message: "password must be a string" })
  @IsNotEmpty({ message: "password is required" })
  @MinLength(3, {
    message: "password must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "password must be shorter than or equal to 20 characters",
  })
  password: string;
}

export class LoginDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => LoginPayloadDto)
  payload: LoginPayloadDto;
}
