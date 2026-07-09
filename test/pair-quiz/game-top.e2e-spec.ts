import { createUserHelper } from '../helpers/create-user.helper';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { loginHelper } from '../helpers/login.helper';
import { createQuestionsHelper } from '../helpers/create-published-questions.helper';
import { publishQuestionsHelper } from '../helpers/publish-question.helper';
import { beforeEach } from 'node:test';
import { playGameHelper } from '../helpers/play-game.helper';
import { appSetup } from '../../src/setup/app.setup';

describe('Game /top e2e', () => {
  let app: INestApplication;

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

  it('GET /pair-game-quiz/users/top/ - should return 200 and paginated list of top users', async () => {
    await createUserHelper(app, {
      login: 'user123',
      password: 'password',
      email: 'user123@m.com',
    });
    await createUserHelper(app, {
      login: 'user124',
      password: 'password',
      email: 'user124@m.com',
    });
    const token_user123 = await loginHelper(app, 'user123', 'password');
    const token_user124 = await loginHelper(app, 'user124', 'password');

    const questions = await createQuestionsHelper(app);
    await publishQuestionsHelper(app, questions);

    // First game
    const firstGame = await playGameHelper(app, token_user123, token_user124);
    expect(firstGame.status).toBe('Finished');
    const secondGame = await playGameHelper(app, token_user123, token_user124, [
      ['A2', 'A2'],
      ['A1', 'A3'],
      ['A4', 'A4'],
      ['A2', 'A2'],
      ['A2', 'A1'],
    ]);
    expect(secondGame.status).toBe('Finished');
    const thirdGame = await playGameHelper(app, token_user123, token_user124, [
      ['A2', 'A4'],
      ['A1', 'A5'],
      ['A4', 'A1'],
      ['A5', 'A2'],
      ['A3', 'A3'],
    ]);
    expect(thirdGame.status).toBe('Finished');

    // with default sort
    const defaultRes = await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top')
      .expect(200);

    expect(defaultRes.body).toEqual(
      expect.objectContaining({
        pagesCount: expect.any(Number),
        page: 1,
        pageSize: expect.any(Number),
        totalCount: 2,
        items: expect.any(Array),
      }),
    );

    expect(defaultRes.body.items).toHaveLength(2);

    await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top?sort=avgScores desc')
      .expect(200);

    // with sort
    const sortRes = await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top')
      .query({
        sort: ['avgScores desc', 'sumScore desc', 'winsCount desc', 'lossesCount asc'],
      })
      .expect(200);

    expect(sortRes.body.items).toHaveLength(2);

    expect(sortRes.body.items[0]).toEqual(
      expect.objectContaining({
        player: expect.objectContaining({
          login: expect.any(String),
        }),
        avgScores: expect.any(Number),
        sumScore: expect.any(Number),
        winsCount: expect.any(Number),
        lossesCount: expect.any(Number),
      }),
    );

    // pagination
    const paginationRes = await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top')
      .query({
        pageNumber: 2,
        pageSize: 1,
      })
      .expect(200);

    expect(paginationRes.body).toEqual(
      expect.objectContaining({
        page: 2,
        pageSize: 1,
        totalCount: 2,
        pagesCount: 2,
      }),
    );

    expect(paginationRes.body.items).toHaveLength(1);
  });

  it('GET /pair-game-quiz/users/top/ - should return 200 or 400', async () => {
    await request(app.getHttpServer()).get('/pair-game-quiz/users/top').expect(200);
    await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top')
      .query({
        sort: ['avgScoresBREAK!!!!!!! desc'],
      })
      .expect(400);

    await request(app.getHttpServer())
      .get(
        '/pair-game-quiz/users/top?sort=avgScores desc&sort=sumScore desc&sort=winsCount desc&sort=lossesCount asc',
      )
      .expect(200);
    await request(app.getHttpServer())
      .get('/pair-game-quiz/users/top')
      .query({
        sort: ['avgScores desc', 'sumScore desc', 'winsCount desc', 'lossesCount asc'],
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
