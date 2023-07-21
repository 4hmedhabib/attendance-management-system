import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class CreateClassPayload {
  @IsString({ message: "class name must be a string" })
  @IsNotEmpty({ message: "class name is required" })
  @MinLength(3, {
    message: "class name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class name must be shorter than or equal to 32 characters",
  })
  className: string;

  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;

  @IsString({ message: "shift slug must be a string" })
  @IsNotEmpty({ message: "shift slug is required" })
  @MinLength(3, {
    message: "shift slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift slug must be shorter than or equal to 62 characters",
  })
  shiftSlug: string;

  @IsString({ message: "faculty slug must be a string" })
  @IsNotEmpty({ message: "faculty slug is required" })
  @MinLength(3, {
    message: "faculty slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty slug must be shorter than or equal to 62 characters",
  })
  facultySlug: string;
}

export class CreateClassDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateClassPayload)
  payload: CreateClassPayload;
}

export class UpdateClassData {
  @IsString({ message: "class name must be a string" })
  @IsNotEmpty({ message: "class name is required" })
  @MinLength(3, {
    message: "class name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class name must be shorter than or equal to 32 characters",
  })
  className: string;

  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;

  @IsString({ message: "shift slug must be a string" })
  @IsNotEmpty({ message: "shift slug is required" })
  @MinLength(3, {
    message: "shift slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift slug must be shorter than or equal to 62 characters",
  })
  shiftSlug: string;

  @IsString({ message: "faculty slug must be a string" })
  @IsNotEmpty({ message: "faculty slug is required" })
  @MinLength(3, {
    message: "faculty slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty slug must be shorter than or equal to 62 characters",
  })
  facultySlug: string;
}

class UpdateClassPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  classSlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateClassData)
  data: UpdateClassData;
}

export class UpdateClassDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateClassPayload)
  payload: UpdateClassPayload;
}

class GetClassBySlugPayload {
  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

class GetClassSemestersBySlugPayload {
  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetClassBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassBySlugPayload)
  payload: GetClassBySlugPayload;
}

export class GetClassSemestersBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassSemestersBySlugPayload)
  payload: GetClassSemestersBySlugPayload;
}

class CreateClassSemesterPayloadSemester {
  @IsString({ message: "semester slug must be a string" })
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;
  @IsDateString()
  startDate: string | Date;
  @IsDateString()
  endDate: string | Date;
}

export class CreateClassSemesterPayload {
  @IsString()
  classSlug: string;
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateClassSemesterPayloadSemester)
  semester: CreateClassSemesterPayloadSemester;
}

export class CreateClassSemesterDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateClassSemesterPayload)
  payload: CreateClassSemesterPayload;
}

class CreateClassSemesterCoursePayloadCourse {
  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;
  @IsString({ message: "teacher id must be a string" })
  @IsNotEmpty({ message: "teacher id is required" })
  @MinLength(3, {
    message: "teacher id must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "teacher id must be shorter than or equal to 62 characters",
  })
  teacherId: string;
}

export class CreateClassSemesterCoursePayload {
  @IsString()
  classSlug: string;
  @IsString()
  semesterSlug: string;
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @Type(() => CreateClassSemesterCoursePayloadCourse)
  courses: CreateClassSemesterCoursePayloadCourse[];
}

export class CreateClassSemesterCoursesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateClassSemesterCoursePayload)
  payload: CreateClassSemesterCoursePayload;
}

class GetClassSemesterCoursesBySlugPayload {
  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsString({ message: "semester slug must be a string" })
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetClassSemesterCoursesBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassSemesterCoursesBySlugPayload)
  payload: GetClassSemesterCoursesBySlugPayload;
}

class DeleteClassBySlugPayload {
  @IsString({ message: "class slug must be a string" })
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;
}

export class DeleteClassBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteClassBySlugPayload)
  payload: DeleteClassBySlugPayload;
}

export class GetClassesFilters {
  @IsString({ message: "faculty slug must be a string" })
  @IsOptional({ message: "faculty slug is required" })
  facultySlug?: string;
}

export class GetClassesPayload {
  @IsBoolean({ message: "Is mini view must be a boolean" })
  @IsNotEmpty({ message: "Is mini view is required" })
  isMiniView: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassesFilters)
  filters: GetClassesFilters;
}

export class GetClassesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassesPayload)
  payload: GetClassesPayload;
}

export class CreateClassSemesterCourseAttendancePayload {
  @IsString()
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsString()
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;

  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;

  @IsString({ message: "teacher id must be a string" })
  @IsNotEmpty({ message: "teacher id is required" })
  @MinLength(3, {
    message: "teacher id must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "teacher id must be shorter than or equal to 62 characters",
  })
  teacherId: string;
}

export class CreateClassSemesterCourseAttendancesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateClassSemesterCourseAttendancePayload)
  payload: CreateClassSemesterCourseAttendancePayload;
}

export class GetClassSemesterCourseAttendancePayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;

  @IsString()
  @IsNotEmpty({ message: "class slug is required" })
  @MinLength(3, {
    message: "class slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "class slug must be shorter than or equal to 62 characters",
  })
  classSlug: string;

  @IsString()
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;

  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;

  @IsString({ message: "teacher id must be a string" })
  @IsNotEmpty({ message: "teacher id is required" })
  @MinLength(3, {
    message: "teacher id must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "teacher id must be shorter than or equal to 62 characters",
  })
  teacherId: string;

  @IsDateString({}, { message: "start date must be a date" })
  @IsNotEmpty({ message: "start date is required" })
  startDate: string;

  @IsDateString({}, { message: "end date must be a date" })
  @IsNotEmpty({ message: "end date is required" })
  endDate: string;
}

export class GetClassSemesterCourseAttendancesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassSemesterCourseAttendancePayload)
  payload: GetClassSemesterCourseAttendancePayload;
}

export class UpdateClassSemesterCourseAttendancePayload {
  @IsNumber({}, { message: "attendance id must be a number" })
  @IsNotEmpty({ message: "attendance id is required" })
  attendanceId: number;

  @IsString({ message: "status slug must be a string" })
  @IsNotEmpty({ message: "status slug is required" })
  @MinLength(3, {
    message: "status slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "status slug must be shorter than or equal to 62 characters",
  })
  statusSlug: string;
}

export class UpdateClassSemesterCourseAttendancesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateClassSemesterCourseAttendancePayload)
  payload: UpdateClassSemesterCourseAttendancePayload;
}
