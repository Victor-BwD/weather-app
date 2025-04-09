import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './app/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });

  app.enableCors();

  const name = env.API_NAME;
  const port = env.API_PORT;
  await app.listen(port, () => {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `=> 🚀 ${name} SERVER RUNNING ON PORT: ${port}`,
    );
  });
}
bootstrap();
