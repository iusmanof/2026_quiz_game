import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class CreateQuestionCommand {
  constructor(
    public body: string,
    public correctAnswers: string[],
  ) {}
}

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionUseCase implements ICommandHandler<CreateQuestionCommand> {
  async execute(command: CreateQuestionCommand) {
    // TODO: Implement once repository/domain is available
  }
}
