import { Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTopUsersQuery } from '../../application/queries/get-top-users.query-handler';
import { GetCurrentGamesQuery } from '../../application/queries/get-current-games.query-handler';
import { GetCurrentUserStatisticQuery } from '../../application/queries/get-current-user-statistic.query-handler';
import { GetCurrentUnfinishedUserGameQuery } from '../../application/queries/get-current-unfinished-user-game.query-handler';
import { GetGameByIdQuery } from '../../application/queries/get-game-by-id.query-handler';
import { ConnectCurrentUserCommand } from '../../application/commands/connect-current-user.command-handler';
import { SendAnswerForNextCommand } from '../../application/commands/send-answer-for-next.command-handler';
import { JwtAuthGuard } from '@user-accounts/guards/bearer/jwt-auth.guard';
import type { AuthenticatedRequest } from '@user-accounts/types/authenticated-request.interface';
import { GameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';

@Controller('pair-game-quiz')
class PairGameQuizController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('users/top')
  @HttpCode(HttpStatus.OK)
  async getTopUsers() {
    return this.queryBus.execute(new GetTopUsersQuery());
  }

  @Get('pairs/my')
  @HttpCode(HttpStatus.OK)
  async getCurrentGames() {
    return this.queryBus.execute(new GetCurrentGamesQuery());
  }

  @Get('users/my-statistic')
  @HttpCode(HttpStatus.OK)
  async getCurrentUserStatistic() {
    return this.queryBus.execute(new GetCurrentUserStatisticQuery());
  }

  @Get('pairs/my-current')
  @HttpCode(HttpStatus.OK)
  async getCurrentUnfinishedUserGame() {
    return this.queryBus.execute(new GetCurrentUnfinishedUserGameQuery());
  }

  @UseGuards(JwtAuthGuard)
  @Get('pairs/:id')
  @HttpCode(HttpStatus.OK)
  async getGameById(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<GameViewDto> {
    const userId = req.user.id;
    console.log(userId);
    return this.queryBus.execute(new GetGameByIdQuery(id, userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('pairs/connection')
  @HttpCode(HttpStatus.OK)
  async connectCurrentUser(@Req() req: AuthenticatedRequest): Promise<GameViewDto> {
    const userId = req.user.id;
    return this.commandBus.execute(new ConnectCurrentUserCommand(userId));
  }

  @Post('pairs/my-current/answers')
  @HttpCode(HttpStatus.OK)
  async sendAnswerForNext() {
    return this.commandBus.execute(new SendAnswerForNextCommand());
  }
}

export default PairGameQuizController;
