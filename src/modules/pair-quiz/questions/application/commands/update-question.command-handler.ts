import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionDto } from '@modules/pair-quiz/questions/api/dto/update-question.dto';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { NotFoundException } from '@nestjs/common';

export class UpdateQuestionCommand {
  constructor(
    public id: string,
    public dto: UpdateQuestionDto,
  ) {}
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionUseCase implements ICommandHandler<UpdateQuestionCommand> {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async execute(command: UpdateQuestionCommand) {
    const question = await this.questionRepository.findById(command.id);

    if (!question) {
      throw new NotFoundException(`Question ${command.id} not found`);
    }
    await this.questionRepository.update(command.id, command.dto);
  }
}
