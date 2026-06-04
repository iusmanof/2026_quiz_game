import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Quiz game')
    .setDescription('The game description')
    .setVersion('1.0')
    .addTag('PairQuizGame')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
}
