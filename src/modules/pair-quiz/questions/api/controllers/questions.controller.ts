import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionCommand } from '../../../questions/application/commands/create-question.command-handler';
import { UpdateQuestionCommand } from '../../../questions/application/commands/update-question.command-handler';
import { DeleteQuestionCommand } from '../../../questions/application/commands/delete-question.command-handler';
import { PublishQuestionCommand } from '../../../questions/application/commands/publish-question.command-handler';
import { GetAllQuestionsQuery } from '../../../questions/application/queries/get-all-questions.query-handler';

@Controller('/sa/quiz/')
class QuestionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('questions')
  @HttpCode(HttpStatus.OK)
  async getAllQuestions(
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortDirection') sortDirection: string = 'desc',
    @Query('bodySearchTerm') bodySearchTerm?: string,
    @Query('publishedOnly') publishedOnly?: boolean,
  ) {
    return this.queryBus.execute(
      new GetAllQuestionsQuery(
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        bodySearchTerm,
        publishedOnly,
      ),
    );
  }

  @Post('questions')
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() dto: { body: string; correctAnswers: string[] }) {
    return this.commandBus.execute(new CreateQuestionCommand(dto.body, dto.correctAnswers));
  }

  @Delete('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuestion(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteQuestionCommand(id));
  }

  @Put('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editQuestions(
    @Param('id') id: string,
    @Body() dto: { body: string; correctAnswers: string[] },
  ) {
    return this.commandBus.execute(new UpdateQuestionCommand(id, dto.body, dto.correctAnswers));
  }

  @Put('questions/:id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  async publishQuestion(@Param('id') id: string) {
    return this.commandBus.execute(new PublishQuestionCommand(id));
  }
}

export default QuestionsController;
