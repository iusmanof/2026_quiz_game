import { Module } from "@nestjs/common";
import { DbClearController } from "./api/controllers/db-clear.controller";
import { DbClearService } from "./application/services/db-clear.service";

@Module({
  imports: [],
  controllers: [DbClearController],
  providers: [DbClearService],
})
export class DbClearModule {}
