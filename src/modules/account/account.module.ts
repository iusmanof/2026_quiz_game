import { Module } from "@nestjs/common";
import { AuthController } from "./api/controllers/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AccountModule {}
