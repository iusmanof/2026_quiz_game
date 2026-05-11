import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import DatabaseConfiguration, {
  DatabaseConfig,
} from "src/core/config/database/database.config.ts";
import { TypeOrmModule } from "@nestjs/typeorm";
import DynamicConfigeModule from "./dynamic-config.module.ts";

@Module({
  imports: [
    DynamicConfigeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService<DatabaseConfig>) {
        return config.get("database", { infer: true });
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
