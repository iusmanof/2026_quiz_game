import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';

export class CreateQuestionCommand {
  constructor(public createQuestionDto: CreateQuestionDto) {}
}

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionUseCase implements ICommandHandler<CreateQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(command: CreateQuestionCommand) {
    return await this.questionRepository.create(command.createQuestionDto);
  }
}
