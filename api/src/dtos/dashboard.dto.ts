import { IsBoolean } from "class-validator";

export class DashboardDto {
  @IsBoolean({ message: "Is min view must be a boolean" })
  isMiniView: boolean;
}
