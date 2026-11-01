import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe - valida DTOs automaticamente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma types automaticamente
      whitelist: true, // Remove campos não definidos em DTO
      forbidNonWhitelisted: true, // Lança erro se houver campos extras
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Exception Filter - trata erros globalmente
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
