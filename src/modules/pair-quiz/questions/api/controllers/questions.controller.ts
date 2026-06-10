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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionCommand } from '../../../questions/application/commands/create-question.command-handler';
import { UpdateQuestionCommand } from '../../../questions/application/commands/update-question.command-handler';
import { DeleteQuestionCommand } from '../../../questions/application/commands/delete-question.command-handler';
import { PublishQuestionCommand } from '../../../questions/application/commands/publish-question.command-handler';
import { GetAllQuestionsQuery } from '../../../questions/application/queries/get-all-questions.query-handler';
import { QueryParamsDto } from '@modules/pair-quiz/questions/api/dto/query-params.dto';
import { CreateQuestionDto } from '@modules/pair-quiz/questions/api/dto/create-question.dto';
import { PaginatedViewDto } from '@core/dto/paginated-view.dto';
import { QuestionViewDto } from '@modules/pair-quiz/questions/application/queries/dto/question-view.dto';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateQuestionDto } from '@modules/pair-quiz/questions/api/dto/update-question.dto';
import { PublishedQuestionDto } from '@modules/pair-quiz/questions/api/dto/published-question.dto';
import { BasicAuthGuard } from '@user-accounts/guards/basic/basic.guard';

@UseGuards(BasicAuthGuard)
@Controller('/sa/quiz/')
class QuestionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('questions')
  @HttpCode(HttpStatus.OK)
  async getAllQuestions(
    @Query() queryParams: QueryParamsDto,
  ): Promise<PaginatedViewDto<QuestionViewDto>> {
    return this.queryBus.execute(new GetAllQuestionsQuery(queryParams));
  }

  @Post('questions')
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() dto: CreateQuestionDto): Promise<CreateQuestionDto> {
    return this.commandBus.execute(new CreateQuestionCommand(dto));
  }

  @Delete('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Question deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Question not found',
  })
  async deleteQuestion(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteQuestionCommand(id));
  }

  @Put('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editQuestions(@Param('id') id: string, @Body() dto: UpdateQuestionDto): Promise<void> {
    return this.commandBus.execute(new UpdateQuestionCommand(id, dto));
  }

  @Put('questions/:id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  async publishQuestion(
    @Param('id') id: string,
    @Body() published: PublishedQuestionDto,
  ): Promise<void> {
    return this.commandBus.execute(new PublishQuestionCommand(id, published));
  }
}

export default QuestionsController;
