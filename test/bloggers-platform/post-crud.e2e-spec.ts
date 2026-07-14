import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { appSetup } from '../../src/setup/app.setup';
import request from 'supertest';
import { getBasicAuthHeaderHelper } from '../helpers/get-basic-auth-header.helper';

describe('Posts CRUD', () => {
  let app: INestApplication;
  let blogId: string;
  let postId: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    appSetup(app);
    await app.init();

    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);

    // Создаем блог для постов
    const blog = await request(app.getHttpServer())
      .post('/sa/blogs')
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        name: 'Test blog',
        description: 'Test description',
        websiteUrl: 'https://test.com',
      })
      .expect(201);

    blogId = blog.body.id;
  });

  it('POST /posts', async () => {
    const res = await request(app.getHttpServer())
      .post('/sa/posts')
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        title: 'Post title',
        shortDescription: 'Short description',
        content: 'Post content',
        blogId,
      })
      .expect(201);

    postId = res.body.id;

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Post title',
      shortDescription: 'Short description',
      content: 'Post content',
      blogId,
      blogName: 'Test blog',
      createdAt: expect.any(String),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    });
  });

  it('GET /posts/:id', async () => {
    const res = await request(app.getHttpServer()).get(`/posts/${postId}`).expect(200);

    expect(res.body).toEqual({
      id: postId,
      title: 'Post title',
      shortDescription: 'Short description',
      content: 'Post content',
      blogId,
      blogName: 'Test blog',
      createdAt: expect.any(String),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    });
  });

  it('PUT /posts/:id', async () => {
    await request(app.getHttpServer())
      .put(`/sa/posts/${postId}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        title: 'Updated title',
        shortDescription: 'Updated short description',
        content: 'Updated content',
        blogId,
      })
      .expect(204);

    const res = await request(app.getHttpServer()).get(`/posts/${postId}`).expect(200);

    expect(res.body.title).toBe('Updated title');
    expect(res.body.shortDescription).toBe('Updated short description');
    expect(res.body.content).toBe('Updated content');
  });

  it('GET /posts', async () => {
    const res = await request(app.getHttpServer()).get('/posts').expect(200);

    expect(res.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: postId,
          title: 'Updated title',
        }),
      ]),
    );
  });

  it('DELETE /sa/posts/:id', async () => {
    // создаем блог
    const resBlog = await request(app.getHttpServer())
      .post('/sa/blogs')
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        name: 'string',
        description: 'string',
        websiteUrl:
          'https://YFr6-xAGpM_spK2ismtbspdDOR9CMQX0mHG2V3YR_cijmI07yQUwbiQk.-FHLIPu4pEEmtmuxUwQckOYbDV66LxQV2or',
      })
      .expect(201);

    const blogIdForDelete = resBlog.body.id;

    const resPost = await request(app.getHttpServer())
      .post('/sa/posts')
      .set('Authorization', getBasicAuthHeaderHelper())
      .send({
        title: 'Post title',
        shortDescription: 'Short description',
        content: 'Post content',
        blogId: blogIdForDelete,
      })
      .expect(201);

    const postIdForDelete = resPost.body.id;

    await request(app.getHttpServer())
      .delete(`/sa/posts/${postIdForDelete}`)
      .set('Authorization', getBasicAuthHeaderHelper())
      .expect(204);

    await request(app.getHttpServer()).get(`/sa/posts/${postIdForDelete}`).expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
