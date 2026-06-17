import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors();
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:52',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
