import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class CreateCoursePayload {
  @IsString({ message: "course name must be a string" })
  @IsNotEmpty({ message: "course name is required" })
  @MinLength(3, {
    message: "course name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course name must be shorter than or equal to 32 characters",
  })
  courseName: string;

  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  manager: string;

  @IsString()
  @MaxLength(32)
  deputy: string;
}

export class CreateCourseDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCoursePayload)
  payload: CreateCoursePayload;
}

export class UpdateCourseData {
  @IsString({ message: "course name must be a string" })
  @IsNotEmpty({ message: "course name is required" })
  @MinLength(3, {
    message: "course name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course name must be shorter than or equal to 32 characters",
  })
  courseName: string;

  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

class UpdateCoursePayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  courseSlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateCourseData)
  data: UpdateCourseData;
}

export class UpdateCourseDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateCoursePayload)
  payload: UpdateCoursePayload;
}

class GetCourseBySlugPayload {
  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetCoursesBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetCoursesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetCoursesBySlugPayload)
  payload: GetCoursesBySlugPayload;
}

export class GetCourseBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetCourseBySlugPayload)
  payload: GetCourseBySlugPayload;
}

class DeleteCourseBySlugPayload {
  @IsString({ message: "course slug must be a string" })
  @IsNotEmpty({ message: "course slug is required" })
  @MinLength(3, {
    message: "course slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "course slug must be shorter than or equal to 62 characters",
  })
  courseSlug: string;
}

export class DeleteCourseBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteCourseBySlugPayload)
  payload: DeleteCourseBySlugPayload;
}
