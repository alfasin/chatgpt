import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
  ],
  providers: [OpenaiService],
  controllers: [OpenaiController],
  exports: [OpenaiService], // make sure to export any services you want to use in other modules
})
export class OpenaiModule {}
