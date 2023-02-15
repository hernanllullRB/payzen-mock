import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, Matches, MaxLength, ValidateNested } from "class-validator";

class RegistrationSchema {
  @IsNotEmpty()
  @MaxLength(32)
  @Matches(/^[a-z0-9_-]+$/)
  provider: string
}

class DetailsSchema {
  @IsNotEmpty()
  @MaxLength(100)
  legalName: string

  @IsNotEmpty()
  @MaxLength(2)
  @Matches(/^[A-Z]{2}$/)
  country: string
}

class TradingSchema {
  
}

class CustomizationSchema {
  @IsNotEmpty()
  @MaxLength(64)
  timeZone: string

  @IsNotEmpty()
  @MaxLength(5)
  language: string

  @IsNotEmpty()
  @MaxLength(128)
  securityCode: string

  @IsNotEmpty()
  @MaxLength(32)
  theme: string
}

const TITLE = [
  "MR",
  "MRS",
  "MISS"
]

class ContactSchema {
  @IsNotEmpty()
  @IsEnum(TITLE)
  title: string

  @IsNotEmpty()
  @MaxLength(60)
  firstName: string

  @IsNotEmpty()
  @MaxLength(60)
  lastName: string

  @IsNotEmpty()
  @MaxLength(1024)
  email: string
}

class ContactsSchema {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactSchema)
  administrator: ContactSchema

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactSchema)
  technical: ContactSchema

  @IsNotEmpty()
  @ValidateNested()
  incident: any
}

export class CompanyRequestBody {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RegistrationSchema)
  readonly registration: RegistrationSchema;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DetailsSchema)
  readonly details: DetailsSchema;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TradingSchema)
  readonly trading: TradingSchema;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CustomizationSchema)
  readonly customization: CustomizationSchema;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactsSchema)
  readonly contacts: ContactsSchema;

}