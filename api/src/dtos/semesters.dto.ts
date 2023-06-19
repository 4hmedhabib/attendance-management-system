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

class CreateSemesterPayload {
  @IsString({ message: "semester name must be a string" })
  @IsNotEmpty({ message: "semester name is required" })
  @MinLength(3, {
    message: "semester name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester name must be shorter than or equal to 32 characters",
  })
  semesterName: string;

  @IsString({ message: "semester slug must be a string" })
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

export class CreateSemesterDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateSemesterPayload)
  payload: CreateSemesterPayload;
}

export class UpdateSemesterData {
  @IsString({ message: "semester name must be a string" })
  @IsNotEmpty({ message: "semester name is required" })
  @MinLength(3, {
    message: "semester name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester name must be shorter than or equal to 32 characters",
  })
  semesterName: string;

  @IsString({ message: "semester slug must be a string" })
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

class UpdateSemesterPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  semesterSlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateSemesterData)
  data: UpdateSemesterData;
}

export class UpdateSemesterDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateSemesterPayload)
  payload: UpdateSemesterPayload;
}

class GetSemesterBySlugPayload {
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

export class GetSemestersBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetSemestersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetSemestersBySlugPayload)
  payload: GetSemestersBySlugPayload;
}

export class GetSemesterBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetSemesterBySlugPayload)
  payload: GetSemesterBySlugPayload;
}

class DeleteSemesterBySlugPayload {
  @IsString({ message: "semester slug must be a string" })
  @IsNotEmpty({ message: "semester slug is required" })
  @MinLength(3, {
    message: "semester slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semester slug must be shorter than or equal to 62 characters",
  })
  semesterSlug: string;
}

export class DeleteSemesterBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteSemesterBySlugPayload)
  payload: DeleteSemesterBySlugPayload;
}
