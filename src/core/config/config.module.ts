import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import databaseConf from "./database/database.config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), "src", "env", `.env.${process.env.NODE_ENV}.local`),
        join(process.cwd(), "src", "env", `.env.${process.env.NODE_ENV}`),
        join(process.cwd(), "src", "env", `.env`),
      ],
      load: [databaseConf],
    }),
  ],
})
export class AppConfigModule {}
