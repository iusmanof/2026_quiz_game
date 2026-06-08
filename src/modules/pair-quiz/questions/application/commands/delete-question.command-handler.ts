import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';

export class DeleteQuestionCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionUseCase implements ICommandHandler<DeleteQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: DeleteQuestionCommand) {
    await this.questionRepository.delete(command.id);
  }
}
