import PairGameQuizController from '@modules/pair-quiz/game/api/controllers/pair-quiz-game.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import QuestionsController from '@modules/pair-quiz/questions/api/controllers/questions.controller';
import { GetTopUsersQueryHandler } from '@modules/pair-quiz/game/application/queries/get-top-users.query-handler';
import { GetCurrentGamesQueryHandler } from '@modules/pair-quiz/game/application/queries/get-current-games.query-handler';
import { GetCurrentUserStatisticQueryHandler } from '@modules/pair-quiz/game/application/queries/get-current-user-statistic.query-handler';
import { GetCurrentUnfinishedUserGameQueryHandler } from '@modules/pair-quiz/game/application/queries/get-current-unfinished-user-game.query-handler';
import { GetGameByIdQueryHandler } from '@modules/pair-quiz/game/application/queries/get-game-by-id.query-handler';
import { ConnectCurrentUserUseCase } from '@modules/pair-quiz/game/application/commands/connect-current-user.command-handler';
import { SendAnswerForNextUseCase } from '@modules/pair-quiz/game/application/commands/send-answer-for-next.command-handler';

const controllers = [PairGameQuizController, QuestionsController];
const repositories = [];
const useCases = [ConnectCurrentUserUseCase, SendAnswerForNextUseCase];
const handlers = [
  GetTopUsersQueryHandler,
  GetCurrentGamesQueryHandler,
  GetCurrentUserStatisticQueryHandler,
  GetCurrentUnfinishedUserGameQueryHandler,
  GetGameByIdQueryHandler,
];
const services = [];
const exportsRepo = [];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...repositories, ...useCases, ...handlers, ...services],
  exports: [...exportsRepo],
})
export class PairQuizModule {}
