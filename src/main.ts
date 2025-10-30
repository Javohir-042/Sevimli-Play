import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ["error", "warn"]});

  app.setGlobalPrefix("api")

  app.use(cookieParser());
  
  app.useGlobalPipes(new ValidationPipe())


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

  const PORT = process.env.PORT ?? 5555;
  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(`Swagger document: http://localhost:${PORT}/api`);
  });

}
bootstrap();
