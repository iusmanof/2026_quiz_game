import PairGameQuizController from '@modules/pair-quiz/game/api/controllers/pair-quiz-game.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import QuestionsController from '@modules/pair-quiz/questions/api/controllers/questions.controller';

const controllers = [PairGameQuizController, QuestionsController];
const repositories = [];
const useCases = [];
const handlers = [];
const services = [];
const exportsRepo = [];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...repositories, ...useCases, ...handlers, ...services],
  exports: [...exportsRepo],
})
export class PairQuizModule {}
