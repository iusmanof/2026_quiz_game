import { Module } from "@nestjs/common";
import { AppConfigModule } from "./core/config/config.module";
import { DatabaseModule } from "./core/database/database.module";
import { AccountModule } from "./modules/account/account.module";
import { PairGameModule } from "./modules/pair-game/pair_game.module";
import { DbClearModule } from "./modules/db-clear/db-clear.module";

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AccountModule,
    PairGameModule,
    DbClearModule,
  ],
})
export class AppModule {}
