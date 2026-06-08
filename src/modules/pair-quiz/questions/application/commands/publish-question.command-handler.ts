import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { PublishedQuestionDto } from '@modules/pair-quiz/questions/api/dto/published-question.dto';

export class PublishQuestionCommand {
  constructor(
    public id: number,
    public published: PublishedQuestionDto,
  ) {}
}

@CommandHandler(PublishQuestionCommand)
export class PublishQuestionUseCase implements ICommandHandler<PublishQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: PublishQuestionCommand) {
    await this.questionRepository.setPublished(command.id, command.published);
  }
}
