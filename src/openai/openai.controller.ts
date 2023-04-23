import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';

@Controller('openai')
@ApiTags('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get()
  @ApiOperation({ summary: 'Send chatGPT a aprompt' })
  async getResponse(@Query('prompt') prompt: string): Promise<string> {
    return this.openaiService.getResponse(prompt);
  }
}
