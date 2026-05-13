import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import DynamicEnvConfigureModule from "./dynamic-config.module";

@Module({
  imports: [
    // TODO
    // ConfigModule.forRoot({
    //     isGlobal: true,
    //     load: [databaseConf],
    // }),
    // TypeOrmModule.forRootAsync({
    //     useFactory(config: ConfigService<DatabaseConfig>) {
    //         return config.get('database', {
    //             infer: true,
    //         });
    //     },
    //     inject: [ConfigService],
    // }),
    DynamicEnvConfigureModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>("DB_HOST");
        const port = configService.get<string>("DB_PORT");
        const user = configService.get<string>("DB_USER");
        const db = configService.get<string>("DB_NAME");
        console.log(
          `🟢 [TYPEORM] DB connected | host=${host} | port=${port} | user=${user} | db=${db}`,
        );
        return {
          type: "postgres",

          host,
          port: Number(port),

          username: configService.getOrThrow<string>("DB_USER"),
          password: configService.getOrThrow<string>("DB_PASSWORD"),
          database: configService.getOrThrow<string>("DB_NAME"),

          autoLoadEntities: true,

          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}
