import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { appSetup } from '../../src/setup/app.setup';
import request from 'supertest';
import { beforeEach } from 'node:test';
import { INestApplication } from '@nestjs/common';
import { createUserHelper } from '../helpers/create-user.helper';
import { loginHelper } from '../helpers/login.helper';
import { createQuestionsHelper } from '../helpers/create-published-questions.helper';
import { publishQuestionsHelper } from '../helpers/publish-question.helper';
import { connectToGameHelper } from '../helpers/connect-to-game.helper';
import { answerHelper } from '../helpers/answer.helper';
import { getGameByIdHelper } from '../helpers/getGameById.helper';

describe('Game If either player answers all the questions, the other player has 10 seconds to answer all the questions. Otherwise, the game ends. Any unanswered questions are treated as incorrect answers.', () => {
  let app: INestApplication;
  let token1: string;
  let token2: string;

  const login1 = `userTest1`;
  const password1 = 'password';
  const email1 = `usertest1@mail.com`;

  const login2 = `userTest2`;
  const password2 = 'password';
  const email2 = `usertest2@mail.com`;

  const login3 = `userTest3`;
  const password3 = 'password';
  const email3 = `usertest3@mail.com`;

  const login4 = `userTest4`;
  const password4 = 'password';
  const email4 = `usertest4@mail.com`;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    appSetup(app);
    await app.init();
    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);
  });
  beforeEach(async () => {
    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);
  });

  it('POST /pair-game-quiz/pairs/my-current/answers 8 sec wait and end the game', async () => {
    await createUserHelper(app, {
      login: login1,
      password: password1,
      email: email1,
    });

    await createUserHelper(app, {
      login: login2,
      password: password2,
      email: email2,
    });

    token1 = await loginHelper(app, login1, password1);
    token2 = await loginHelper(app, login2, password2);

    const questions = await createQuestionsHelper(app);
    await publishQuestionsHelper(app, questions);
    const connect1 = await connectToGameHelper(app, token1);
    expect(connect1.status).toBe('PendingSecondPlayer');
    const connect2 = await connectToGameHelper(app, token2);
    expect(connect2.status).toBe('Active');
    const gameId = connect1.id;

    await answerHelper(app, token1, 'A1');
    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token1, 'A3');
    await answerHelper(app, token1, 'A4');
    await answerHelper(app, token1, 'A5');

    await new Promise((resolve) => setTimeout(resolve, 8000));

    await answerHelper(app, token2, 'A1');
    await answerHelper(app, token2, 'A2');
    await answerHelper(app, token2, 'A3');
    await answerHelper(app, token2, 'A4');
    await answerHelper(app, token2, 'A5');

    const fullGame = await getGameByIdHelper(app, token1, gameId);
    expect(fullGame.status).toBe('Finished');
    expect(fullGame.secondPlayerProgress.answers).toHaveLength(5);
  }, 20000);

  it('POST /pair-game-quiz/pairs/my-current/answers 11 sec wait and end the game', async () => {
    await createUserHelper(app, {
      login: login3,
      password: password3,
      email: email3,
    });

    await createUserHelper(app, {
      login: login4,
      password: password4,
      email: email4,
    });

    token1 = await loginHelper(app, login1, password1);
    token2 = await loginHelper(app, login2, password2);

    const questions = await createQuestionsHelper(app);
    await publishQuestionsHelper(app, questions);
    const connect1 = await connectToGameHelper(app, token1);
    expect(connect1.status).toBe('PendingSecondPlayer');
    const connect2 = await connectToGameHelper(app, token2);
    expect(connect2.status).toBe('Active');
    const gameId = connect1.id;

    await answerHelper(app, token1, 'A1');
    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token1, 'A3');
    await answerHelper(app, token1, 'A4');
    await answerHelper(app, token1, 'A5');

    await new Promise((resolve) => setTimeout(resolve, 11000));

    await answerHelper(app, token2, 'A1');
    await answerHelper(app, token2, 'A2');
    await answerHelper(app, token2, 'A3');
    await answerHelper(app, token2, 'A4');
    await answerHelper(app, token2, 'A5');

    const fullGame = await getGameByIdHelper(app, token1, gameId);
    expect(fullGame.status).toBe('Finished');
    expect(fullGame.secondPlayerProgress.score).toBe(0);
  }, 20000);

  afterAll(async () => {
    await app.close();
  });
});
