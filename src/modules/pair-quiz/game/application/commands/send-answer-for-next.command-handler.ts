import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class SendAnswerForNextCommand {}

@CommandHandler(SendAnswerForNextCommand)
export class SendAnswerForNextUseCase implements ICommandHandler<SendAnswerForNextCommand> {
  async execute(command: SendAnswerForNextCommand) {
    // TODO: Implement once repository/domain is available
  }
}
