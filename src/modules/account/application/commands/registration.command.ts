import { RegistrationDataDto } from "../../api/dto/registration-data.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegistrationRepository } from "../../infrastructure/registration.repository";

export class RegistrationCommand {
  constructor(public body: RegistrationDataDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegisterCommandUseCase implements ICommandHandler<RegistrationCommand> {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}
}
