import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ["error", "warn"]});

  app.setGlobalPrefix("api")
  
  app.useGlobalPipes(new ValidationPipe())

  const PORT = process.env.PORT

  const config = new DocumentBuilder()
    .setTitle('Sevimli Play Project')
    .setDescription('The Sevimli Play API description')
    .setVersion('1.0')
    .addTag('Nest')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 5555, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(`Swagger document: http://localhost:${PORT}/api`);
  });
}
bootstrap();
