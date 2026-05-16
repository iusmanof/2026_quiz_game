import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import databaseConf from "../database/database.config";
import { Global, Module } from "@nestjs/common";
import { CoreConfig } from "./core.config";

@Global()
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
  providers: [CoreConfig],
  exports: [CoreConfig],
})
export class AppConfigModule {}
