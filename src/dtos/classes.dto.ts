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

export class GetClassBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassBySlugPayload)
  payload: GetClassBySlugPayload;
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

export class GetClassesPayload {
  @IsBoolean({ message: "Is mini view must be a boolean" })
  @IsNotEmpty({ message: "Is mini view is required" })
  isMiniView: boolean;
}

export class GetClassesDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetClassesPayload)
  payload: GetClassesPayload;
}
