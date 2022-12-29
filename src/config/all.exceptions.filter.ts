import { HttpAdapterHost } from "@nestjs/core";
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { NotAvailableException } from "../adapter/exception/not.available.exception";
import { BusinessException } from "../application/exception/business.exception";
import { NotFoundException as NotFoundExceptionCustom } from "../adapter/exception/not.found.exception";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof NotFoundException ||
      exception instanceof NotFoundExceptionCustom
        ? HttpStatus.NOT_FOUND
        : exception instanceof NotAvailableException
        ? HttpStatus.SERVICE_UNAVAILABLE
        : exception instanceof BusinessException
        ? HttpStatus.CONFLICT
        : exception instanceof BadRequestException
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      description: exception?.description
        ? exception?.description
        : exception?.response?.message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
