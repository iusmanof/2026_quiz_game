import { Module } from '@nestjs/common';
import { configModule } from './config-module';
import { UserAccountsModule } from '@user-accounts/user-accounts.module';
import { CoreConfig } from '@core/core.config';
import { BloggersPlatformModule } from '@modules/bloggers-platform/bloggers-platform.module';
import { PostgresqlDatabaseModule } from '@core/database/postgresql-database.module';
import { DeleteAllDataModule } from '@modules/delete-all-data/delete-all-data.module';
import { PairQuizModule } from '@modules/pair-quiz/pair-quiz.module';

@Module({
  imports: [
    configModule,
    PostgresqlDatabaseModule,
    UserAccountsModule,
    BloggersPlatformModule,
    PairQuizModule,
    DeleteAllDataModule,
  ],
  controllers: [],
  providers: [CoreConfig],
  exports: [CoreConfig],
})
export class AppModule {}
