import { Injectable } from '@nestjs/common';
import UsersRepository from '../user-accounts/infrastructure/users.repository';
import SessionRepository from '@user-accounts/infrastructure/session.repository';
import EmailConfirmationRepository from '@user-accounts/infrastructure/email-confirmation.repository';
import BlogsRepository from '@modules/bloggers-platform/blogs/infrastructure/blogs.repository';
import PostsRepository from '@modules/bloggers-platform/posts/infrastructure/posts.repository';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';

@Injectable()
export class DeleteAllDataService {
  constructor(
    private readonly blogsRepository: BlogsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly emailConfirmationRepository: EmailConfirmationRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly gameRepository: GameRepository,
  ) {}

  async clearAll(): Promise<void> {
    await Promise.all([
      this.blogsRepository.deleteAll(),
      this.postsRepository.deleteAll(),
      this.usersRepository.deleteAll(),
      this.sessionRepository.deleteAll(),
      this.emailConfirmationRepository.deleteAll(),
      this.questionRepository.deleteAllQuestion(),
      this.gameRepository.deleteAllGames(),
      this.gameRepository.deleteAllPlayerProgress(),
      this.gameRepository.deleteAllPlayerAnswer(),
    ]);
  }
}
