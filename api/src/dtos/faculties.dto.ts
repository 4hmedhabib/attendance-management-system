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

class CreateFacultyPayload {
  @IsString({ message: "faculty name must be a string" })
  @IsNotEmpty({ message: "faculty name is required" })
  @MinLength(3, {
    message: "faculty name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty name must be shorter than or equal to 32 characters",
  })
  facultyName: string;

  @IsString({ message: "faculty slug must be a string" })
  @IsNotEmpty({ message: "faculty slug is required" })
  @MinLength(3, {
    message: "faculty slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty slug must be shorter than or equal to 62 characters",
  })
  facultySlug: string;

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

export class CreateFacultyDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateFacultyPayload)
  payload: CreateFacultyPayload;
}

export class UpdateFacultyData {
  @IsString({ message: "faculty name must be a string" })
  @IsNotEmpty({ message: "faculty name is required" })
  @MinLength(3, {
    message: "faculty name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty name must be shorter than or equal to 32 characters",
  })
  facultyName: string;

  @IsString({ message: "faculty slug must be a string" })
  @IsNotEmpty({ message: "faculty slug is required" })
  @MinLength(3, {
    message: "faculty slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty slug must be shorter than or equal to 62 characters",
  })
  facultySlug: string;

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

class UpdateFacultyPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  facultySlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateFacultyData)
  data: UpdateFacultyData;
}

export class UpdateFacultyDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateFacultyPayload)
  payload: UpdateFacultyPayload;
}

class GetFacultyBySlugPayload {
  @IsString({ message: "faculty slug must be a string" })
  @IsNotEmpty({ message: "faculty slug is required" })
  @MinLength(3, {
    message: "faculty slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "faculty slug must be shorter than or equal to 62 characters",
  })
  facultySlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}


export class GetFacultiesBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;


}

export class GetFacultiesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetFacultiesBySlugPayload)
  payload: GetFacultiesBySlugPayload;
}

export class GetFacultyBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetFacultyBySlugPayload)
  payload: GetFacultyBySlugPayload;
}

class DeleteFacultyBySlugPayload {
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

export class DeleteFacultyBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteFacultyBySlugPayload)
  payload: DeleteFacultyBySlugPayload;
}
