import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class DeleteQuestionCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionUseCase implements ICommandHandler<DeleteQuestionCommand> {
  async execute(command: DeleteQuestionCommand) {
    // TODO: Implement once repository/domain is available
  }
}
