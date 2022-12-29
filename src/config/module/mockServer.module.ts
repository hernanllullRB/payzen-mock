import { CacheModule, Module } from "@nestjs/common";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigurationProperties } from "../configuration.properties";
import { MockServerControllerAdapter } from "../../adapter/in/controller/mockServer.controller.";

@Module({
  imports: [
    CommonModule,
    HttpModule.registerAsync({
      imports:[CommonModule],
      useFactory: (config: ConfigurationProperties) => ({
        timeout: config.getRestClientConfiguration().getTimeout(),
      }),
      inject: [ConfigurationProperties],
    }),
    CacheModule.register()
  ],
  controllers: [MockServerControllerAdapter],
  providers: []
})
export class MockServerModule {
}