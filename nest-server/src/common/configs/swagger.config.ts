import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Management APIs')
  .setDescription('The Task Management API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'Bearer',
    description: 'Enter your access token here'
  })
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Task Management API',
  customCss: '.swagger-ui section.models { display: none}',
  customfavIcon: '/public/static/app-logo.svg'
};
