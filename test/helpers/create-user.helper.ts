import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from '@user-accounts/api/dto/create-user.dto';
import { UserViewDto } from '@user-accounts/api/dto/user-view.dto';
import { getBasicAuthHeaderHelper } from './get-basic-auth-header.helper';
import request from 'supertest';

export const createUserHelper = async (
  app: INestApplication,
  dto: CreateUserDto,
): Promise<UserViewDto> => {
  const res = await request(app.getHttpServer())
    .post('/sa/users')
    .set('Authorization', getBasicAuthHeaderHelper())
    .send(dto)
    .expect(201);

  expect(res.body).toEqual({
    id: expect.any(String),
    login: expect.any(String),
    email: expect.any(String),
    createdAt: expect.any(String),
  });

  return res.body as UserViewDto;
};
