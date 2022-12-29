import { Module } from "@nestjs/common";
import { ConfigurationProperties } from "../configuration.properties";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "config/.env"
    })
  ],
  providers: [ConfigurationProperties],
  exports: [ConfigurationProperties]
})
export class CommonModule {
}