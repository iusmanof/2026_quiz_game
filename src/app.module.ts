import { Module } from "@nestjs/common";
import { AppConfigModule } from "./core/config/config.module";
import { DatabaseModule } from "./core/database/database.module";
import { AccountModule } from "./modules/account/account.module";

@Module({
  imports: [AppConfigModule, DatabaseModule, AccountModule],
})
export class AppModule {}
