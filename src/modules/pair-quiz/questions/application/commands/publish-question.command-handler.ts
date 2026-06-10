import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { PublishedQuestionDto } from '@modules/pair-quiz/questions/api/dto/published-question.dto';
import { NotFoundException } from '@nestjs/common';

export class PublishQuestionCommand {
  constructor(
    public id: string,
    public published: PublishedQuestionDto,
  ) {}
}

@CommandHandler(PublishQuestionCommand)
export class PublishQuestionUseCase implements ICommandHandler<PublishQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: PublishQuestionCommand) {
    const question = await this.questionRepository.findById(command.id);

    if (!question) {
      throw new NotFoundException();
    }

    await this.questionRepository.setPublished(command.id, command.published);
  }
}
