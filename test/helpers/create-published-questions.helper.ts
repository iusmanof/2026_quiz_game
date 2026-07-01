import { INestApplication } from '@nestjs/common';
import { createQuestionHelper } from './create-question.helper';

export const createQuestionsHelper = async (app: INestApplication) => {
  const answers = ['A1', 'A2', 'A3', 'A4', 'A5'];

  const questions = [];

  for (let i = 0; i < answers.length; i++) {
    const question = await createQuestionHelper(app, {
      body: `Question ${i + 1}`,
      correctAnswers: [answers[i]],
    });

    questions.push(question);
  }

  return questions;
};
