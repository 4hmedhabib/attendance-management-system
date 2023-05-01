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

class CreateStudentPayload {
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

  @IsString({ message: "studentId must be a string" })
  @IsNotEmpty({ message: "studentId is required" })
  @MinLength(3, {
    message: "studentId must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "studentId must be shorter than or equal to 15 characters",
  })
  studentId: string;

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

export class CreateStudentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateStudentPayload)
  payload: CreateStudentPayload;
}

export class UpdateStudentData {
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

  @IsString({ message: "studentId must be a string" })
  @IsNotEmpty({ message: "studentId is required" })
  @MinLength(3, {
    message: "studentId must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "studentId must be shorter than or equal to 15 characters",
  })
  studentId: string;

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

class UpdateStudentPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  studentId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateStudentData)
  data: UpdateStudentData;
}

export class UpdateStudentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateStudentPayload)
  payload: UpdateStudentPayload;
}

class GetStudentBySlugPayload {
  @IsString({ message: "studentId must be a string" })
  @IsNotEmpty({ message: "studentId is required" })
  @MinLength(3, {
    message: "studentId must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "studentId must be shorter than or equal to 62 characters",
  })
  studentId: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetStudentsBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetStudentsDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetStudentsBySlugPayload)
  payload: GetStudentsBySlugPayload;
}

export class GetStudentBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetStudentBySlugPayload)
  payload: GetStudentBySlugPayload;
}

class DeleteStudentBySlugPayload {
  @IsString({ message: "studentId must be a string" })
  @IsNotEmpty({ message: "studentId is required" })
  @MinLength(3, {
    message: "studentId must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "studentId must be shorter than or equal to 62 characters",
  })
  studentId: string;
}

export class DeleteStudentBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteStudentBySlugPayload)
  payload: DeleteStudentBySlugPayload;
}
