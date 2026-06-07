import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class UpdateQuestionCommand {
  constructor(
    public id: string,
    public body: string,
    public correctAnswers: string[],
  ) {}
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionUseCase implements ICommandHandler<UpdateQuestionCommand> {
  async execute(command: UpdateQuestionCommand) {
    // TODO: Implement once repository/domain is available
  }
}
