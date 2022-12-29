import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

const PAYMENT_WORKFLOW = [
  "IMMEDIATE_CAPTURE",
  "DELAYED_CAPTURE"
]

const PAYMENT_APPROVAL = [
  "RECURRENT",
  "SINGLE",
  "RECURRENT_AND_SINGLE"
]

const PAYMENT_TYPES = [
  "E_COMMERCE",
  "MOTO"
]

class DetailsSchema {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^[0-9]+$/)
  merchantId: string;

  @IsNotEmpty()
  terminalId: string

  @IsNotEmpty()
  @IsEnum(PAYMENT_WORKFLOW)
  paymentWorkflow: string

  @IsNotEmpty()
  @IsEnum(PAYMENT_APPROVAL)
  paymentApproval: string
}

export class MerchantRequestBody {
  @IsNotEmpty()
  @Matches(/^[a-f0-9]{32}$/)
  readonly company: string;

  @IsNotEmpty()
  @MaxLength(60)
  @Matches(/^[a-zA-Z0-9_-]+$/)
  readonly acquirerApi: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(16)
  readonly paymentMethods: string[];

  @IsNotEmpty()
  readonly currencies: string[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DetailsSchema)
  readonly details: DetailsSchema;

  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPES, {each: true})
  paymentTypes: string[]
}