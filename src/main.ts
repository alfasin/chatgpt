import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MetricsInterceptor } from './metrics.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Apply the MetricsInterceptor globally
  app.useGlobalInterceptors(new MetricsInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('Example API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
