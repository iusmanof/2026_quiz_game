import request from 'supertest';

const api = request('http://localhost:5005');

(async () => {
  // очистка

  await api.delete('/testing/all-data');

  // создание пользователей

  await api.post('/sa/users').auth('admin', 'qwerty').send({
    login: 'user1',
    password: 'qwerty1',
    email: 'user1@mail.com',
  });

  await api.post('/sa/users').auth('admin', 'qwerty').send({
    login: 'user2',
    password: 'qwerty1',
    email: 'user2@mail.com',
  });

  // логин

  const user1Login = await api.post('/auth/login').send({
    loginOrEmail: 'user1',
    password: '123456',
  });

  const user2Login = await api.post('/auth/login').send({
    loginOrEmail: 'user2',
    password: '123456',
  });

  const token1 = user1Login.body.accessToken;
  const token2 = user2Login.body.accessToken;

  console.log('USER1 TOKEN:', token1);
  console.log('USER2 TOKEN:', token2);

  // создаём 5 вопросов

  const questionIds: string[] = [];

  for (let i = 1; i <= 5; i++) {
    const createdQuestion = await api
      .post('/sa/quiz/questions')
      .auth('admin', 'qwerty')
      .send({
        body: `Question ${i}`,
        correctAnswers: ['answer'],
      });

    questionIds.push(createdQuestion.body.id);

    console.log('QUESTION CREATED:', createdQuestion.body.id);
  }

  // публикуем вопросы

  for (const questionId of questionIds) {
    await api.put(`/sa/quiz/questions/${questionId}/publish`).auth('admin', 'qwerty').send({
      published: true,
    });

    console.log('QUESTION PUBLISHED:', questionId);
  }

  // user1 создаёт игру

  const game1 = await api
    .post('/pair-game-quiz/pairs/connection')
    .set('Authorization', `Bearer ${token1}`)
    .send({});

  console.log('USER1 CREATE GAME');
  console.log(game1.body);
  //
  // // user2 подключается
  //
  // const game2 = await api
  //   .post('/pair-game-quiz/pairs/connection')
  //   .set('Authorization', `Bearer ${token2}`)
  //   .send({});
  //
  // console.log('USER2 CONNECT');
  // console.log(JSON.stringify(game2.body, null, 2));
  //
  // // проверяем что вопросы попали в игру
  //
  // console.log('QUESTIONS COUNT:', game2.body.questions?.length);
  //
  // // 5 ответов
  //
  // for (let i = 1; i <= 5; i++) {
  //   const answer = await api
  //     .post('/pair-game-quiz/pairs/my-current/answers')
  //     .set('Authorization', `Bearer ${token1}`)
  //     .send({
  //       answer: 'answer',
  //     });
  //
  //   console.log(`ANSWER #${i}`);
  //   console.log(answer.status);
  //   console.log(answer.body);
  // }
  //
  // // текущая игра
  //
  // const currentGame = await api
  //   .get('/pair-game-quiz/pairs/my-current')
  //   .set('Authorization', `Bearer ${token1}`);
  //
  // console.log('CURRENT GAME');
  // console.log(JSON.stringify(currentGame.body, null, 2));
  //
  // // шестой ответ
  //
  // const sixthAnswer = await api
  //   .post('/pair-game-quiz/pairs/my-current/answers')
  //   .set('Authorization', `Bearer ${token1}`)
  //   .send({
  //     answer: 'answer',
  //   });
  //
  // console.log('SIXTH ANSWER STATUS');
  // console.log(sixthAnswer.status);
  //
  // console.log('SIXTH ANSWER BODY');
  // console.log(sixthAnswer.body);
})();
