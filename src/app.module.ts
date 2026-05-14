import { Module } from "@nestjs/common";
import { AppConfigModule } from "./core/config/config.module";
import { DatabaseModule } from "./core/config/database/database.module";

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
  ],
})
export class AppModule {}
