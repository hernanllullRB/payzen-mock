import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";
import { MockServerModule } from "./config/module/mockServer.module";

@Module({
  imports: [
    MockServerModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {
}
