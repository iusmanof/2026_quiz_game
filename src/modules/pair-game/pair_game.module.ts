import { CqrsModule } from "@nestjs/cqrs";
import { Module } from "@nestjs/common";
import { PairGameController } from "./api/controllers/pair-game.controller";

@Module({
  imports: [CqrsModule],
  controllers: [PairGameController],
  providers: [],
  exports: [],
})
export class PairGameModule {}
