import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private openai: any;
  private readonly logger = new Logger(OpenaiService.name);

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getResponse(prompt: string): Promise<string> {
    const messages = [{ role: 'user', content: prompt }];
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      const completionText = completion.data.choices[0].message.content;
      console.log(completionText);
      return completionText.trim();
    } catch (e) {
      this.logger.log('Failed to execute getResponse', e);
      return 'default msg bc I still dont have a subscription for the API...';
    }
  }
}
