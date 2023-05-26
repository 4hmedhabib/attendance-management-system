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

class CreateShiftPayload {
  @IsString({ message: "shift name must be a string" })
  @IsNotEmpty({ message: "shift name is required" })
  @MinLength(3, {
    message: "shift name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift name must be shorter than or equal to 32 characters",
  })
  shiftName: string;

  @IsString({ message: "shift slug must be a string" })
  @IsNotEmpty({ message: "shift slug is required" })
  @MinLength(3, {
    message: "shift slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift slug must be shorter than or equal to 62 characters",
  })
  shiftSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

export class CreateShiftDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateShiftPayload)
  payload: CreateShiftPayload;
}

export class UpdateShiftData {
  @IsString({ message: "shift name must be a string" })
  @IsNotEmpty({ message: "shift name is required" })
  @MinLength(3, {
    message: "shift name must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift name must be shorter than or equal to 32 characters",
  })
  shiftName: string;

  @IsString({ message: "shift slug must be a string" })
  @IsNotEmpty({ message: "shift slug is required" })
  @MinLength(3, {
    message: "shift slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift slug must be shorter than or equal to 62 characters",
  })
  shiftSlug: string;

  @IsString({ message: "description must be a string" })
  @MaxLength(500, {
    message: "description must be shorter than or equal to 500 characters",
  })
  description?: string;
}

class UpdateShiftPayload {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(62)
  shiftSlug: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateShiftData)
  data: UpdateShiftData;
}

export class UpdateShiftDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateShiftPayload)
  payload: UpdateShiftPayload;
}

class GetShiftBySlugPayload {
  @IsString({ message: "shift slug must be a string" })
  @IsNotEmpty({ message: "shift slug is required" })
  @MinLength(3, {
    message: "shift slug must be longer than or equal to 3 characters",
  })
  @MaxLength(62, {
    message: "shift slug must be shorter than or equal to 62 characters",
  })
  shiftSlug: string;

  @IsBoolean({ message: "Is min view must be a boolean" })
  @IsNotEmpty({ message: "Is min view is required" })
  isMiniView: boolean;
}

export class GetShiftBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetShiftBySlugPayload)
  payload: GetShiftBySlugPayload;
}

class DeleteShiftBySlugPayload {
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

export class DeleteShiftBySlugDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeleteShiftBySlugPayload)
  payload: DeleteShiftBySlugPayload;
}

export class GetShiftsPayload {
  @IsBoolean({ message: "Is mini view must be a boolean" })
  @IsNotEmpty({ message: "Is mini view is required" })
  isMiniView: boolean;
}

export class GetShiftsDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetShiftsPayload)
  payload: GetShiftsPayload;
}
