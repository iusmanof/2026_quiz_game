import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication): void{
 const config = new DocumentBuilder()
    .setTitle('Quiz game')
    .setDescription('The game description')
    .setVersion('1.0')
    .addTag('PairQuizGame')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
}



// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Uber API',
//       version: '1.0.0',
//       description: 'uber API',
//     },
//   },
//   apis: ['./src/**/*.swagger.yml'],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// export const setupSwagger = (app: Express) => {
//   app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };