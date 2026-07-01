import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';

export const connectToGameHelper = async (app: INestApplication, accessToken: string) => {
  const res = await request(app.getHttpServer())
    .post('/pair-game-quiz/pairs/connection')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  return res.body as GameViewDto;
};
