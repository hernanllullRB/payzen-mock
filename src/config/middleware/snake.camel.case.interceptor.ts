import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

function transformObject(body, transform){
  if(!body) return body
  const newObj = {};
  Object.keys(body).forEach(
    (key) => (newObj[transform(key)] = body[key])
  );
  return newObj;
}

@Injectable()
export class SnakeCamelCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = transformObject(request.body, _.camelCase)
    return next
      .handle()
      .pipe(
        map((data) => transformObject(data, _.snakeCase)),
      );
  }
}