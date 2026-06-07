import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class PublishQuestionCommand {
  constructor(public id: string) {}
}

@CommandHandler(PublishQuestionCommand)
export class PublishQuestionUseCase implements ICommandHandler<PublishQuestionCommand> {
  async execute(command: PublishQuestionCommand) {
    // TODO: Implement once repository/domain is available
  }
}
