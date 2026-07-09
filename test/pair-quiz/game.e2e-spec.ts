import { createUserHelper } from '../helpers/create-user.helper';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { loginHelper } from '../helpers/login.helper';
import { connectToGameHelper } from '../helpers/connect-to-game.helper';
import { createQuestionsHelper } from '../helpers/create-published-questions.helper';
import { publishQuestionsHelper } from '../helpers/publish-question.helper';
import { answerHelper } from '../helpers/answer.helper';
import { getCurrentGameHelper } from '../helpers/get-current-game.helper';
import { getGameByIdHelper } from '../helpers/getGameById.helper';
import { currentUserStatisticHelper } from '../helpers/current-user-statistic.helper';
import { beforeEach } from 'node:test';
import { playGameHelper } from '../helpers/play-game.helper';
import { appSetup } from '../../src/setup/app.setup';

describe('Game e2e', () => {
  let app: INestApplication;
  let token1: string;
  let token2: string;

  const login1 = `user1`;
  const password1 = 'password';
  const email1 = `user1@mail.com`;

  const login2 = `user2`;
  const password2 = 'password';
  const email2 = `user2@mail.com`;

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

  it('test full logic of game', async () => {
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

    // Connect to the game
    const connect1 = await connectToGameHelper(app, token1);
    expect(connect1.status).toBe('PendingSecondPlayer');
    const connect2 = await connectToGameHelper(app, token2);
    expect(connect2.status).toBe('Active');
    const gameId = connect1.id;

    // Start game
    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token2, 'A2');

    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token2, 'A3');

    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token2, 'A2');

    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token2, 'A2');

    // check GET /pair-game-quiz/pairs/my-current
    await getCurrentGameHelper(app, token1);
    await getCurrentGameHelper(app, token2);

    await answerHelper(app, token1, 'A2');
    await answerHelper(app, token2, 'A2');

    const fullGame = await getGameByIdHelper(app, token1, gameId);
    expect(fullGame.status).toBe('Finished');

    const stat = await currentUserStatisticHelper(app, token1);
    expect(stat.gamesCount).toBe(1);
    expect(stat.sumScore).toBeGreaterThanOrEqual(0);
    expect(stat.avgScores).toBe(stat.sumScore);
    expect(stat.winsCount + stat.lossesCount + stat.drawsCount).toBe(1);
  });

  it('GET /pair-game-quiz/pairs/my - should return all user games (finished + current)', async () => {
    await createUserHelper(app, {
      login: 'userA',
      password: 'password',
      email: 'userA@mail.com',
    });

    await createUserHelper(app, {
      login: 'userB',
      password: 'password',
      email: 'userB@mail.com',
    });

    await createUserHelper(app, {
      login: 'userC',
      password: 'password',
      email: 'userC@mail.com',
    });

    const tokenA = await loginHelper(app, 'userA', 'password');
    const tokenB = await loginHelper(app, 'userB', 'password');
    const tokenC = await loginHelper(app, 'userC', 'password');

    const questions = await createQuestionsHelper(app);
    await publishQuestionsHelper(app, questions);

    // GAME 1 → A + B (FINISHED)
    const game1_A = await connectToGameHelper(app, tokenA);
    await connectToGameHelper(app, tokenB);

    for (let i = 0; i < 5; i++) {
      await answerHelper(app, tokenA, 'A2');
      await answerHelper(app, tokenB, 'A2');
    }

    const finishedGame = await getGameByIdHelper(app, tokenA, game1_A.id);
    expect(finishedGame.status).toBe('Finished');

    // GAME 2 → A + C (ACTIVE)
    await connectToGameHelper(app, tokenA);
    await connectToGameHelper(app, tokenC);

    await answerHelper(app, tokenA, 'A2');
    await answerHelper(app, tokenC, 'A2');

    // GET MY GAMES (A)
    await request(app.getHttpServer())
      .get('/pair-game-quiz/pairs/my')
      .set('Authorization', `Bearer ${tokenA}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
