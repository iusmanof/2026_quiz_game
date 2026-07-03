import { Module } from '@nestjs/common';
import { configModule } from './config-module';
import { UserAccountsModule } from '@user-accounts/user-accounts.module';
import { CoreConfig } from '@core/core.config';
import { BloggersPlatformModule } from '@modules/bloggers-platform/bloggers-platform.module';
import { PostgresqlDatabaseModule } from '@core/database/postgresql-database.module';
import { DeleteAllDataModule } from '@modules/delete-all-data/delete-all-data.module';
import { GlobalThrottlerModule } from '@core/throttler/throttler.module';
import { PairQuizModule } from '@modules/pair-quiz/pair-quiz.module';

@Module({
  imports: [
    configModule,
    UserAccountsModule,
    PairQuizModule,
    PostgresqlDatabaseModule,
    BloggersPlatformModule,
    DeleteAllDataModule,
    GlobalThrottlerModule,
  ],
  controllers: [],
  providers: [CoreConfig],
  exports: [CoreConfig],
})
export class AppModule {}
