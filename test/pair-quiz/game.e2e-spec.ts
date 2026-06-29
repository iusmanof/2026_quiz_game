import { createUserHelper } from '../helpers/create-user.helper';

describe('Game e2e', () => {
  it('should add answers and return current game after each answer', () => {
    const user1 = createUserHelper({
      login: 'user1',
      password: 'password',
      email: 'user1@mail.com',
    });
    const user2 = createUserHelper({
      login: 'user2',
      password: 'password',
      email: 'user2@mail.com',
    });

    console.log(user1);
    console.log(user2);
  });
});
