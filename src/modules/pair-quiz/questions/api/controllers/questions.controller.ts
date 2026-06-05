import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';

@Controller('/sa/quiz/')
class QuestionsController {
  @Get('questions')
  @HttpCode(HttpStatus.OK)
  getAllQuestions() {}

  @Post('questions')
  @HttpCode(HttpStatus.CREATED)
  createQuestion() {}

  @Delete('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteQuestion() {}

  @Put('questions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  editQuestions() {}

  @Put('questions/:id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  publishQuestion() {}
}

export default QuestionsController;