import { Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class CreateTeacherPayload {
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

  @IsString({ message: "teacherId must be a string" })
  @IsNotEmpty({ message: "teacherId is required" })
  @MinLength(3, {
    message: "teacherId must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "teacherId must be shorter than or equal to 15 characters",
  })
  teacherId: string;

  @IsString({ message: "mobileno must be a string" })
  @MaxLength(12, {
    message: "mobileno must be shorter than or equal to 12 characters",
  })
  @MinLength(7, {
    message: "mobileno must be longer than or equal to 7 characters",
  })
  @IsNotEmpty({ message: "mobileno is required" })
  mobileNo: string;

  @IsInt({ message: "year of study must be a number" })
  @IsPositive({ message: "year of study must be a positive number" })
  yearOfStudy: number;
}

export class CreateTeacherDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateTeacherPayload)
  payload: CreateTeacherPayload;
}

export class UpdateTeacherData {
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

  @IsString({ message: "teacherId must be a string" })
  @IsNotEmpty({ message: "teacherId is required" })
  @MinLength(3, {
    message: "teacherId must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "teacherId must be shorter than or equal to 15 characters",
  })
  teacherId: string;

  @IsString({ message: "mobileno must be a string" })
  @MaxLength(12, {
    message: "mobileno must be shorter than or equal to 12 characters",
  })
  @MinLength(7, {
    message: "mobileno must be longer than or equal to 7 characters",
  })
  @IsNotEmpty({ message: "mobileno is required" })
  mobileNo: string;

  @IsInt({ message: "year of study must be a number" })
  @IsPositive({ message: "year of study must be a positive number" })
  yearOfStudy: number;
}

class UpdateTeacherPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  teacherId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateTeacherData)
  data: UpdateTeacherData;
}

export class UpdateTeacherDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateTeacherPayload)
  payload: UpdateTeacherPayload;
}

class GetTeacherBySlugPayload {
  @IsString({ message: "teacherId must be a string" })
  @IsNotEmpty({ message: "teacherId is required" })
  @MinLength(3, {
    message: "teacherId must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "teacherId must be shorter than or equal to 62 characters",
  })
  teacherId: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetTeachersBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetTeachersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetTeachersBySlugPayload)
  payload: GetTeachersBySlugPayload;
}

export class GetTeacherBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetTeacherBySlugPayload)
  payload: GetTeacherBySlugPayload;
}

class DeleteTeacherBySlugPayload {
  @IsString({ message: "teacherId must be a string" })
  @IsNotEmpty({ message: "teacherId is required" })
  @MinLength(3, {
    message: "teacherId must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "teacherId must be shorter than or equal to 62 characters",
  })
  teacherId: string;
}

export class DeleteTeacherBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteTeacherBySlugPayload)
  payload: DeleteTeacherBySlugPayload;
}
