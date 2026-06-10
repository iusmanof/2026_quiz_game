import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { NotFoundException } from '@nestjs/common';

export class DeleteQuestionCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionUseCase implements ICommandHandler<DeleteQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: DeleteQuestionCommand) {
    const question = await this.questionRepository.findById(command.id);

    if (!question) {
      throw new NotFoundException(`Question ${command.id} not found`);
    }

    await this.questionRepository.delete(command.id);
  }
}
