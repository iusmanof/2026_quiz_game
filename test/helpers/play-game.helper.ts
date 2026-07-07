import { INestApplication } from '@nestjs/common';
import { connectToGameHelper } from './connect-to-game.helper';
import { answerHelper } from './answer.helper';
import { getGameByIdHelper } from './getGameById.helper';

type AnswerPair = [string, string];

const defaultAnswers: AnswerPair[] = [
  ['A1', 'A5'],
  ['A2', 'A4'],
  ['A3', 'A3'],
  ['A4', 'A2'],
  ['A5', 'A2'],
];

export const playGameHelper = async (
  app: INestApplication,
  firstToken: string,
  secondToken: string,
  answers: AnswerPair[] = defaultAnswers,
) => {
  const connect1 = await connectToGameHelper(app, firstToken);
  expect(connect1.status).toBe('PendingSecondPlayer');
  const connect2 = await connectToGameHelper(app, secondToken);
  expect(connect2.status).toBe('Active');

  for (const [firstAnswer, secondAnswer] of answers) {
    await answerHelper(app, firstToken, firstAnswer);
    await answerHelper(app, secondToken, secondAnswer);
  }

  return await getGameByIdHelper(app, firstToken, connect1.id);
};
