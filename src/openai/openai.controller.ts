import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';

@Controller('openai')
@ApiTags('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('/chat')
  @ApiOperation({ summary: 'Send chatGPT a prompt' })
  async getChatResponse(@Query('prompt') prompt: string): Promise<string> {
    return this.openaiService.getChatResponse(prompt);
  }

  @Get('/image')
  @ApiOperation({ summary: 'Send an image prompt (DallE)' })
  async getImageResponse(@Query('prompt') prompt: string): Promise<string> {
    return this.openaiService.getImageResponse(prompt);
  }
}
