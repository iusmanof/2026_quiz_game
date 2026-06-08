import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionDto } from '@modules/pair-quiz/questions/api/dto/update-question.dto';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';

export class UpdateQuestionCommand {
  constructor(
    public id: number,
    public dto: UpdateQuestionDto,
  ) {}
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionUseCase implements ICommandHandler<UpdateQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: UpdateQuestionCommand) {
    await this.questionRepository.update(command.id, command.dto);
  }
}
