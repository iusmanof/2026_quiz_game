import { Module } from '@nestjs/common';
import { DeleteAllDataController } from './delete-all-data.controller';
import { DeleteAllDataService } from './delete-all-data.service';
import { BloggersPlatformModule } from '../bloggers-platform/bloggers-platform.module';
import { UserAccountsModule } from '@user-accounts/user-accounts.module';
import { PairQuizModule } from '@modules/pair-quiz/pair-quiz.module';

@Module({
  imports: [BloggersPlatformModule, UserAccountsModule, PairQuizModule],
  controllers: [DeleteAllDataController],
  providers: [DeleteAllDataService],
})
export class DeleteAllDataModule {}
