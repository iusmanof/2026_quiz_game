import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';

export const getGameByIdHelper = async (
  app: INestApplication,
  accessToken: string,
  gameId: string,
) => {
  const res = await request(app.getHttpServer())
    .get(`/pair-game-quiz/pairs/${gameId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  return res.body as GameViewDto;
};
