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
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/player-progress.entity';
import { Game } from '@modules/pair-quiz/game/domain/game.entity';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';
import {
    GetAllQuestionsQueryHandler
} from "@modules/pair-quiz/questions/application/queries/get-all-questions.query-handler";
import QuestionQueryRepository from "@modules/pair-quiz/questions/infrastructure/question.query-repository";

const controllers = [PairGameQuizController, QuestionsController];
const repositories = [QuestionQueryRepository];
const useCases = [ConnectCurrentUserUseCase, SendAnswerForNextUseCase];
const handlers = [
  GetTopUsersQueryHandler,
  GetCurrentGamesQueryHandler,
  GetCurrentUserStatisticQueryHandler,
  GetCurrentUnfinishedUserGameQueryHandler,
  GetGameByIdQueryHandler,
  GetAllQuestionsQueryHandler,
];
const services = [];
const exportsRepo = [];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PlayerProgress, Game, Question])],
  controllers: [...controllers],
  providers: [...repositories, ...useCases, ...handlers, ...services],
  exports: [...exportsRepo],
})
export class PairQuizModule {}
