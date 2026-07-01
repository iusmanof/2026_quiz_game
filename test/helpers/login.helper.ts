import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { LoginResponseDto } from '@user-accounts/api/dto/loign-response.dto';

export const loginHelper = async (
  app: INestApplication,
  loginOrEmail: string,
  password: string,
): Promise<string> => {

  const res = await request(app.getHttpServer()).post('/auth/login').send({
    loginOrEmail,
    password,
  });

  expect(res.status).toBe(200);

  return (res.body as LoginResponseDto).accessToken;
};
