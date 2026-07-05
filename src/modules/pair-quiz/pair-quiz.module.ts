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
import SendAnswerForNextUseCase from '@modules/pair-quiz/game/application/commands/send-answer-for-next.command-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/entites/player-progress.entity';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';
import { GetAllQuestionsQueryHandler } from '@modules/pair-quiz/questions/application/queries/get-all-questions.query-handler';
import QuestionQueryRepository from '@modules/pair-quiz/questions/infrastructure/question.query-repository';
import { CreateQuestionUseCase } from '@modules/pair-quiz/questions/application/commands/create-question.command-handler';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import { DeleteQuestionUseCase } from '@modules/pair-quiz/questions/application/commands/delete-question.command-handler';
import { PublishQuestionUseCase } from '@modules/pair-quiz/questions/application/commands/publish-question.command-handler';
import { UpdateQuestionUseCase } from '@modules/pair-quiz/questions/application/commands/update-question.command-handler';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { UserAccountsModule } from '@user-accounts/user-accounts.module';
import { PlayerAnswer } from '@modules/pair-quiz/game/domain/entites/player-answer.entity';
import GameQueryRepository from '@modules/pair-quiz/game/infrastructure/game.query-repository';
import { GameStatistic } from '@modules/pair-quiz/game/domain/entites/game-statistic.entity';
import { GameFinishedEventHandler } from '@modules/pair-quiz/game/application/event-handlers/game-finished-event.handler';
import GameStatisticRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.repository';
import GameStatisticQueryRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.query-repository';
import { GameQuestion } from '@modules/pair-quiz/game/domain/entites/game-question.entity';

const controllers = [PairGameQuizController, QuestionsController];
const repositories = [
  QuestionQueryRepository,
  QuestionRepository,
  GameRepository,
  GameQueryRepository,
  GameStatisticRepository,
  GameStatisticQueryRepository,
];
const useCases = [
  ConnectCurrentUserUseCase,
  SendAnswerForNextUseCase,
  CreateQuestionUseCase,
  DeleteQuestionUseCase,
  UpdateQuestionUseCase,
  PublishQuestionUseCase,
];
const handlers = [
  GetTopUsersQueryHandler,
  GetCurrentGamesQueryHandler,
  GetCurrentUserStatisticQueryHandler,
  GetCurrentUnfinishedUserGameQueryHandler,
  GetGameByIdQueryHandler,
  GetAllQuestionsQueryHandler,
  GameFinishedEventHandler,
];
const services = [];
const exportsRepo = [QuestionRepository, GameRepository];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PlayerProgress, Game, Question, PlayerAnswer, GameStatistic, GameQuestion]),
    UserAccountsModule,
  ],
  controllers: [...controllers],
  providers: [...repositories, ...useCases, ...handlers, ...services],
  exports: [...exportsRepo],
})
export class PairQuizModule {}
