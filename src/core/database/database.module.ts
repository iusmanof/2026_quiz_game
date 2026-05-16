import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigType } from "@nestjs/config";
import databaseConf from "./database.config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        const db = config.get<ConfigType<typeof databaseConf>>("database");
        if (!db) {
          throw new Error("❌ Database config missing");
        }
        console.log(
          `🟢host=${db.host}:${db.port} database_name=${db.database}`,
        );
        console.log(`⏳ app port: ${process.env.PORT}`);
        return db;
      },
    }),
  ],
})
export class DatabaseModule {}
