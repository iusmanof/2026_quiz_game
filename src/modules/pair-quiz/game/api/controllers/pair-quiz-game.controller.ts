import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('pair-game-quiz')
class PairGameQuizController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('users/top')
  @HttpCode(HttpStatus.OK)
  getTopUsers() {}

  @Get('pairs/my')
  @HttpCode(HttpStatus.OK)
  getCurrentGames() {}

  @Get('users/my-statistic')
  @HttpCode(HttpStatus.OK)
  getCurrentUserStatistic() {}

  @Get('pairs/my-current')
  @HttpCode(HttpStatus.OK)
  getCurrentUnfinishedUserGame() {}

  @Get('pairs/:id')
  @HttpCode(HttpStatus.OK)
  getGameById() {}

  @Post('pairs/connection')
  @HttpCode(HttpStatus.OK)
  connectCurrentUser() {}

  @Post('pairs/my-current/answers')
  @HttpCode(HttpStatus.OK)
  sendAnswerForNext() {}
}

export default PairGameQuizController;
