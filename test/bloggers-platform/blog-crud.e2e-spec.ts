import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { appSetup } from '../../src/setup/app.setup';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getBasicAuthHeaderHelper } from '../helpers/get-basic-auth-header.helper';

describe('Blogs CRUD', () => {
  let app: INestApplication;
  let blogId: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    appSetup(app);
    await app.init();
    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);
  });

  it('POST /sa/blog', async () => {
    const res = await request(app.getHttpServer())
      .post('/sa/blogs')
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        name: 'string',
        description: 'string',
        websiteUrl:
          'https://YFr6-xAGpM_spK2ismtbspdDOR9CMQX0mHG2V3YR_cijmI07yQUwbiQk.-FHLIPu4pEEmtmuxUwQckOYbDV66LxQV2or',
      })
      .expect(201);

    blogId = res.body.id;\

    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      websiteUrl: expect.any(String),
      createdAt: expect.any(String),
      isMembership: expect.any(Boolean),
    });
  });

  it('PUT /blog', async () => {
    const res = await request(app.getHttpServer())
      .get('/sa/blogs')
      .set('Authorization', getBasicAuthHeaderHelper());

    const firstElementId = res.body.items[0].id;
    const response = await request(app.getHttpServer())
      .put(`/sa/blogs/${firstElementId}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        name: 'changedName',
        description: 'changedDescription',
        websiteUrl: 'https://change.url.com',
      })
      .expect(204);
  });

  it('GET /blogs/:id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/blogs/${blogId}`)
      .expect(200);

    expect(res.body).toEqual({
      id: blogId,
      name: 'changedName',
      description: 'changedDescription',
      websiteUrl: 'https://change.url.com',
      createdAt: expect.any(String),
      isMembership: expect.any(Boolean),
    });
  });

  it('DELETE /sa/blogs/:id', async () => {
    await request(app.getHttpServer())
      .delete(`/sa/blogs/${blogId}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(204);

    await request(app.getHttpServer())
      .get(`/blogs/${blogId}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
