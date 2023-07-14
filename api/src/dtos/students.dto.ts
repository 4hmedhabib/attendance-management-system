import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class CreateStudentPayload {
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

export class BulkStudentDataPayload {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @Type(() => CreateStudentPayload)
  data: CreateStudentPayload[];
}

export class CreateBulkStudentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BulkStudentDataPayload)
  payload: BulkStudentDataPayload;
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

  @Type(() => BulkStudentDataPayload)
  payload: BulkStudentDataPayload;
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

export class CreateEnrollmentPayload {
  @IsString({ message: "student id must be a string" })
  @IsNotEmpty({ message: "student id is required" })
  @MinLength(3, {
    message: "student id must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "student id must be shorter than or equal to 20 characters",
  })
  studentId: string;

  @IsString({ message: "teacher id must be a string" })
  @IsNotEmpty({ message: "teacher id is required" })
  @MinLength(3, {
    message: "teacher id must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "teacher id must be shorter than or equal to 20 characters",
  })
  teacherId: string;

  @IsString({ message: "course id must be a string" })
  @IsNotEmpty({ message: "course id is required" })
  @MinLength(3, {
    message: "course id must be longer than or equal to 3 characters",
  })
  @MaxLength(20, {
    message: "course id must be shorter than or equal to 20 characters",
  })
  courseId: string;

  @IsString({ message: "semester id must be a string" })
  @IsNotEmpty({ message: "semester id is required" })
  @MinLength(3, {
    message: "semester id must be longer than or equal to 3 characters",
  })
  @MaxLength(15, {
    message: "semester id must be shorter than or equal to 15 characters",
  })
  semesterId: string;

  @IsString({ message: "class id must be a string" })
  @IsNotEmpty({ message: "class id is required" })
  @MaxLength(15, {
    message: "class id must be shorter than or equal to 15 characters",
  })
  classId: string;
}

export class EnrollmentDataPayload {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @Type(() => CreateEnrollmentPayload)
  data: CreateEnrollmentPayload[];
}

export class CreateEnrollmentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EnrollmentDataPayload)
  payload: EnrollmentDataPayload;
}

export class EnrollmentsPayloadFiltersDto {
  @IsString({ message: "student id must be a string" })
  @IsOptional()
  @MaxLength(15, {
    message: "student id must be shorter than or equal to 15 characters",
  })
  studentId: string;

  @IsString({ message: "class id must be a string" })
  @IsOptional()
  @MaxLength(15, {
    message: "class id must be shorter than or equal to 15 characters",
  })
  classId: string;

  @IsString({ message: "course id must be a string" })
  @IsOptional()
  @MaxLength(15, {
    message: "course id must be shorter than or equal to 15 characters",
  })
  courseId: string;

  @IsString({ message: "semester id must be a string" })
  @IsOptional()
  @MaxLength(15, {
    message: "semester id must be shorter than or equal to 15 characters",
  })
  semesterId: string;
}

export class EnrollmentsPayloadDto {
  @IsBoolean({ message: "is mini view must be a boolean" })
  @IsNotEmpty()
  isMiniView: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EnrollmentsPayloadFiltersDto)
  filters: EnrollmentsPayloadFiltersDto;
}

export class EnrollmentsDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EnrollmentsPayloadDto)
  payload: EnrollmentsPayloadDto;
}

export class EnrollmentDetailPayloadDto {
  @IsInt()
  @IsPositive()
  enrollmentId: number;

  @IsBoolean({ message: "is mini view must be a boolean" })
  @IsNotEmpty()
  isMiniView: boolean;
}

export class EnrollmentDetailDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EnrollmentDetailPayloadDto)
  payload: EnrollmentDetailPayloadDto;
}
