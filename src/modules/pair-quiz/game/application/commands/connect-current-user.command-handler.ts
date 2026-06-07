import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class ConnectCurrentUserCommand {}

@CommandHandler(ConnectCurrentUserCommand)
export class ConnectCurrentUserUseCase implements ICommandHandler<ConnectCurrentUserCommand> {
  async execute(command: ConnectCurrentUserCommand) {
    // TODO: Implement once repository/domain is available
  }
}
