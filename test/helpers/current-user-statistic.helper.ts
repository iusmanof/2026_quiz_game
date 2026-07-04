import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { IGameStatistic } from '@modules/pair-quiz/game/api/dto/game-statistic.dto';

export const currentUserStatisticHelper = async (
  app: INestApplication,
  accessToken: string,
): Promise<IGameStatistic> => {
  const res = await request(app.getHttpServer())
    .get('/pair-game-quiz/users/my-statistic')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  return res.body as IGameStatistic;
};
