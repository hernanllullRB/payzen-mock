import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CompanyRequestBody } from "./model/company.request.body";
import { MerchantRequestBody } from "./model/merchant.request.body";
import { ShopRequestBody } from "./model/shop.request.body";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomId(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result
    .replace(/-/g, "")
    .trim()
    .split("")
    .map((letter) =>
      /[a-f0-9]/.test(letter)
        ? letter
        : String.fromCharCode(Math.floor(Math.random() * 6) + 97)
    )
    .join("")
}

@Controller("v1/")
export class MockServerControllerAdapter {
  private readonly logger = new Logger(MockServerControllerAdapter.name);

  @Post("shops")
  @HttpCode(HttpStatus.CREATED)
  async createShop(@Body() body: ShopRequestBody): Promise<any> {
    return {
      id: generateRandomId(32),
      company: "d38c065665d047538c94d1ffbd47a58c",
      details: {
        reference: "Lyra SMS",
        additionalReference: "L1",
        offerCode: "EXPERT",
        language: "fr_FR",
        complementaryInformation:
          "Add some complementary information about the shop",
        exceptionalFeatures: [],
        captureDelay: 5,
        manualValidation: false,
        paymentOrderValidity: 30,
      },
      contacts: {
        managerEmail: "john.doe@my-company.com",
        supportEmail: "john.doe@my-company.com",
        supportPhone: "+33100000000",
      },
      status: {
        mode: "TEST",
        shiftToLiveDate: "2019-08-24T14:15:22Z",
        shiftToLiveMode: "USER_ACCEPTANCE_SIGN_OFF",
        closingDate: "2019-08-24T14:15:22Z",
        offerRegistrationDate: "2019-08-24T14:15:22Z",
      },
      merchantWebsite: {
        url: "http://www.lyra-sms.com",
        serviceProviderName: "Le site de Lyra SMS",
        testReturnUrl: "http://www.lyra-sms.com/returnTest",
        productionReturnUrl: "http://www.lyra-sms.com/returnProd",
        alphaNumTransId: true,
      },
      options: {
        anticipatedAuthorization: false,
        use3DSecureDuringTokenPayment: false,
        requestSecurityCodeDuringTokenPayment: "ALWAYS",
        startOfSeasonalActivity: "JANUARY",
        endOfSeasonalActivity: "APRIL",
        currencyConversionDisplay: false,
        defaultVAT: 19,
      },
      keys: {
        testKey: "8627912856153542",
        productionKey: "8627912856153542",
        productionKeyLastGeneration: "2019-08-24T14:15:22Z",
        testSignatureAlgorithm: "SHA256",
        productionSignatureAlgorithm: "SHA256",
        restApiKeys: {},
        restApiHashKeys: {},
        jsClientKeys: {},
      },
      context: {
        serverDateTime: "2019-08-24T14:15:22Z",
        user: "john.doe",
        requestId: "2a8d9818957647428cd1d4fc48c5ecc4",
        path: "v1/shops/91335531",
        hostname: "secure.payzen.eu",
      },
    };
  }

  @Post("companies")
  @HttpCode(HttpStatus.CREATED)
  async createCompany(@Body() body: CompanyRequestBody): Promise<any> {
    return {
      id: generateRandomId(32),
      registration: {
        provider: "payzen",
        registrationDate: "2019-08-24T14:15:22Z",
        closingDate: "2019-08-24T14:15:22Z",
      },
      details: {
        legalName: "Lyra Online",
        keyAccount: false,
        nafCode: "6419Z",
        city: "LABEGE",
        zipCode: "31670",
        address: "109 rue de l'innovation",
        country: "FR",
        state: "Alaska",
      },
      trading: {
        legalIdentifier: "45251785700028",
        intracommunityVAT: "FR123456789012",
        sepaCreditorId: "FR98ZZZ0548784878",
        legalForm: "SARL",
        planAhora: false,
        taxRefundLaw: "URY_RETURNS_IVA_LAW_17934",
      },
      customization: {
        timeZone: "Europe/Paris",
        language: "fr_FR",
        currency: "EUR",
        securityCode: "CHANGEME",
        theme: "PayZen",
      },
      contacts: {
        administrator: {},
        technical: {},
        incident: {},
        salespersonContact: "d38c065665d047538c94d1ffbd47a58c",
      },
      context: {
        serverDateTime: "2019-08-24T14:15:22Z",
        user: "john.doe",
        requestId: "2a8d9818957647428cd1d4fc48c5ecc4",
        path: "v1/shops/91335531",
        hostname: "secure.payzen.eu",
      },
    };
  }

  @Post("merchant-ids")
  @HttpCode(HttpStatus.CREATED)
  async createMerchant(@Body() body: MerchantRequestBody): Promise<any> {
    return {
      id: generateRandomId(32),
      company: "d38c065665d047538c94d1ffbd47a58c",
      acquirerApi: "ALIPAY",
      creationDate: "2019-08-24T14:15:22Z",
      closingDate: "2019-08-24T14:15:22Z",
      closingReason: "The Merchant ID date has expired",
      order: 1,
      paymentMethods: ["ALIPAY"],
      currencies: ["EUR"],
      details: {
        merchantId: "5785350",
        integrationMode: "DFS",
        paymentWorkflow: "IMMEDIATE_CAPTURE",
        paymentApproval: "SINGLE",
        merchantName: "nameOfTheMerchant",
        mcc: "5965",
      },
      paymentTypes: ["E_COMMERCE"],
      paymentConstraints: {
        minAmount: 500,
        maxAmount: 150000,
      },
    };
  }

  @Put("shops/:shopId/ordered-merchant-ids/:merchantId")
  @HttpCode(HttpStatus.CREATED)
  async putMerchant(
    @Param("shopId") idShop: string,
    @Param("merchantId") idMerchant: string
  ): Promise<any> {
    return {
      id: generateRandomId(32),
      company: "d38c065665d047538c94d1ffbd47a58c",
      acquirerApi: "ALIPAY",
      creationDate: "2019-08-24T14:15:22Z",
      closingDate: "2019-08-24T14:15:22Z",
      closingReason: "The Merchant ID date has expired",
      order: 1,
      paymentMethods: ["ALIPAY"],
      currencies: ["EUR"],
      details: {
        merchantId: "5785350",
        integrationMode: "DFS",
        paymentWorkflow: "IMMEDIATE_CAPTURE",
        paymentApproval: "SINGLE",
        merchantName: "nameOfTheMerchant",
        mcc: "5965",
      },
      paymentTypes: ["E_COMMERCE"],
      paymentConstraints: {
        minAmount: 500,
        maxAmount: 150000,
      },
    };
  }

  @Delete("shops/:shopId/ordered-merchant-ids/:merchantId")
  @HttpCode(HttpStatus.OK)
  async deleteAssociation(
    @Param("idShop") idShop: string,
    @Param("idMerchant") idMerchant: string
  ): Promise<any> {
    return {};
  }
}
