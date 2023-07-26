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
import { Match } from "../interfaces";

class CreateUserPayload {
  @IsString({ message: "firstname must be a string" })
  @IsNotEmpty({ message: "firstname is required" })
  @MinLength(3, {
    message: "firstname must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "firstname must be shorter than or equal to 20 characters",
  })
  firstName: string;

  @IsString({ message: "middleName must be a string" })
  @IsNotEmpty({ message: "middleName is required" })
  @MinLength(3, {
    message: "middleName must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "middleName must be shorter than or equal to 20 characters",
  })
  middleName: string;

  @IsString({ message: "lastName must be a string" })
  @IsNotEmpty({ message: "lastName is required" })
  @MinLength(3, {
    message: "lastName must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "lastName must be shorter than or equal to 20 characters",
  })
  lastName: string;

  @IsString({ message: "username must be a string" })
  @IsNotEmpty({ message: "username is required" })
  @MinLength(3, {
    message: "username must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "username must be shorter than or equal to 15 characters",
  })
  username: string;

  @IsString({ message: "mobileno must be a string" })
  @MaxLength(12, {
    message: "mobileno must be shorter than or equal to 12 characters",
  })
  @MinLength(7, {
    message: "mobileno must be longer than or equal to 7 characters",
  })
  @IsNotEmpty({ message: "mobileno is required" })
  mobileNo: string;

  @IsString({ message: "email must be a string" })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  @MinLength(3, {
    message: "email must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "email must be shorter than or equal to 62 characters",
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match("password", { message: "Passwords do NOT match" })
  passwordConfirm: string;

  @IsBoolean()
  @IsNotEmpty({ message: "is student field is required" })
  isStudent: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: "is teacher field is required" })
  isTeacher: boolean;
}

export class CreateUserDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserPayload)
  payload: CreateUserPayload;
}

export class UpdateUserData {
  @IsString({ message: "firstname must be a string" })
  @IsNotEmpty({ message: "firstname is required" })
  @MinLength(3, {
    message: "firstname must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "firstname must be shorter than or equal to 20 characters",
  })
  firstName: string;

  @IsString({ message: "middleName must be a string" })
  @IsNotEmpty({ message: "middleName is required" })
  @MinLength(3, {
    message: "middleName must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "middleName must be shorter than or equal to 20 characters",
  })
  middleName: string;

  @IsString({ message: "lastName must be a string" })
  @IsNotEmpty({ message: "lastName is required" })
  @MinLength(3, {
    message: "lastName must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "lastName must be shorter than or equal to 20 characters",
  })
  lastName: string;

  @IsString({ message: "username must be a string" })
  @IsNotEmpty({ message: "username is required" })
  @MinLength(3, {
    message: "username must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "username must be shorter than or equal to 15 characters",
  })
  username: string;

  @IsString({ message: "mobileno must be a string" })
  @MaxLength(12, {
    message: "mobileno must be shorter than or equal to 12 characters",
  })
  @MinLength(7, {
    message: "mobileno must be longer than or equal to 7 characters",
  })
  @IsNotEmpty({ message: "mobileno is required" })
  mobileNo: string;

  @IsString({ message: "email must be a string" })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  @MinLength(3, {
    message: "email must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "email must be shorter than or equal to 62 characters",
  })
  email: string;

  @IsBoolean()
  @IsNotEmpty({ message: "is student field is required" })
  isStudent: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: "is teacher field is required" })
  isTeacher: boolean;
}

class UpdateUserPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  username: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateUserData)
  data: UpdateUserData;
}

export class UpdateUserDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateUserPayload)
  payload: UpdateUserPayload;
}

class GetUserBySlugPayload {
  @IsString({ message: "username must be a string" })
  @IsNotEmpty({ message: "username is required" })
  @MinLength(3, {
    message: "username must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "username must be shorter than or equal to 62 characters",
  })
  username: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetUsersBySlugFilters {
  @IsBoolean({ message: "is admin must be a boolean" })
  @IsNotEmpty({ message: "is admin is required" })
  isAdmin: boolean;
}

export class GetUsersBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetUsersBySlugFilters)
  filters: GetUsersBySlugFilters;
}

export class GetUsersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetUsersBySlugPayload)
  payload: GetUsersBySlugPayload;
}

export class GetUserBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetUserBySlugPayload)
  payload: GetUserBySlugPayload;
}

class DeleteUserBySlugPayload {
  @IsString({ message: "username must be a string" })
  @IsNotEmpty({ message: "username is required" })
  @MinLength(3, {
    message: "username must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "username must be shorter than or equal to 62 characters",
  })
  username: string;
}

export class DeleteUserBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteUserBySlugPayload)
  payload: DeleteUserBySlugPayload;
}
