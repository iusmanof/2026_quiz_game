import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./core/swagger/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// https://github.com/it-incubator/nestjs/blob/main/examples/nestjs/typeorm-postgresql-wallets-entity-repository/src/main.ts

// import { NestFactory } from '@nestjs/core';
// import { appSetup } from './setup/app.setup';
// import { CoreConfig } from '@core/core.config';
// import { initAppModule } from './init-app-module';
//
// async function bootstrap() {
//     const DynamicAppModule = await initAppModule();
//     // создаём на основе донастроенного модуля наше приложение
//     const app = await NestFactory.create(DynamicAppModule);
//
//     const coreConfig = app.get<CoreConfig>(CoreConfig);
//
//     appSetup(app, coreConfig.isSwaggerEnabled); //глобальные настройки приложения
//
//     const port = coreConfig.port;
//
//     await app.listen(port, () => {
//         console.log('App starting listen port: ', port);
//         console.log('NODE_ENV: ', coreConfig.env);
//     });
// }
// bootstrap();
