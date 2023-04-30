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

class CreateSemisterPayload {
  @IsString({ message: "semister name must be a string" })
  @IsNotEmpty({ message: "semister name is required" })
  @MinLength(3, {
    message: "semister name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister name must be shorter than or equal to 32 characters",
  })
  semisterName: string;

  @IsString({ message: "semister slug must be a string" })
  @IsNotEmpty({ message: "semister slug is required" })
  @MinLength(3, {
    message: "semister slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister slug must be shorter than or equal to 62 characters",
  })
  semisterSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

export class CreateSemisterDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateSemisterPayload)
  payload: CreateSemisterPayload;
}

export class UpdateSemisterData {
  @IsString({ message: "semister name must be a string" })
  @IsNotEmpty({ message: "semister name is required" })
  @MinLength(3, {
    message: "semister name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister name must be shorter than or equal to 32 characters",
  })
  semisterName: string;

  @IsString({ message: "semister slug must be a string" })
  @IsNotEmpty({ message: "semister slug is required" })
  @MinLength(3, {
    message: "semister slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister slug must be shorter than or equal to 62 characters",
  })
  semisterSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

class UpdateSemisterPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  semisterSlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateSemisterData)
  data: UpdateSemisterData;
}

export class UpdateSemisterDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateSemisterPayload)
  payload: UpdateSemisterPayload;
}

class GetSemisterBySlugPayload {
  @IsString({ message: "semister slug must be a string" })
  @IsNotEmpty({ message: "semister slug is required" })
  @MinLength(3, {
    message: "semister slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister slug must be shorter than or equal to 62 characters",
  })
  semisterSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetSemistersBySlugPayload {
  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetSemistersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetSemistersBySlugPayload)
  payload: GetSemistersBySlugPayload;
}

export class GetSemisterBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetSemisterBySlugPayload)
  payload: GetSemisterBySlugPayload;
}

class DeleteSemisterBySlugPayload {
  @IsString({ message: "semister slug must be a string" })
  @IsNotEmpty({ message: "semister slug is required" })
  @MinLength(3, {
    message: "semister slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "semister slug must be shorter than or equal to 62 characters",
  })
  semisterSlug: string;
}

export class DeleteSemisterBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteSemisterBySlugPayload)
  payload: DeleteSemisterBySlugPayload;
}
