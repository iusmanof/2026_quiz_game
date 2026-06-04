import { Module } from "@nestjs/common";
import { AuthController } from "./api/controllers/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { CqrsModule } from "@nestjs/cqrs";
import { RegisterCommandUseCase } from "./application/commands/registration.command";
import { RegistrationRepository } from "./infrastructure/registration.repository";

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, RegisterCommandUseCase, RegistrationRepository],
  exports: [],
})
export class AccountModule {}
