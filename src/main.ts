import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // api documentation config
  const configDoc = new DocumentBuilder()
    .setTitle('Pruvit PIM API')
    .setDescription('The detail documentation for pruvit product infomation management API.')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'API auth',
      description: 'Enter JWT access token',
    },
    'API auth'
    )
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'refresh token',
      description: 'Enter JWT refresh token',
    },
    'Refresh auth'
    )
    .build()
  
  const document = SwaggerModule.createDocument(app, configDoc)
  SwaggerModule.setup(
    'api/doc/v1',
    app,
    document,
    {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customfavIcon: 'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png'
    }
  )

  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();
  
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
