import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, Matches, MaxLength, ValidateNested } from "class-validator";

class DetailsSchema {
  @IsNotEmpty()
  @MaxLength(130)
  reference: string;

  @IsNotEmpty()
  @MaxLength(64)
  offerCode: string;

  @IsNotEmpty()
  @MaxLength(5)
  language: string;
}

const MODE = ["TEST", "PRODUCTION"]

class StatusSchema {
  @IsNotEmpty()
  @IsEnum(MODE)
  mode: string;
}

export class ShopRequestBody {
  @IsNotEmpty()
  @Matches(/^[a-f0-9]{32}$/)
  readonly company: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DetailsSchema)
  readonly details: DetailsSchema;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StatusSchema)
  readonly status: StatusSchema;

}