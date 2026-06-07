import { Question } from '@modules/pair-quiz/questions/domain/question.entity';

export class QuestionViewDto {
  id: number;
  body: string;
  correctAnswers: string[];
  published: boolean;
  createdAt: string;

  static mapToView(question: Question): QuestionViewDto {
    return {
      id: question.id,
      body: question.body,
      correctAnswers: question.correctAnswers,
      published: question.published,
      createdAt: question.createdAt.toISOString(),
    };
  }
}
