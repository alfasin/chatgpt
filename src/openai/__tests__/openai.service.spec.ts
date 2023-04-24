import { Test } from '@nestjs/testing';
import { OpenaiService } from '../openai.service';
import { OpenAIApi } from 'openai';

jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(() => ({
    createChatCompletion: jest.fn(),
    createImage: jest.fn(),
  })),
}));

describe('OpenaiService', () => {
  let openaiService: OpenaiService;
  let openaiApi: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OpenaiService],
    }).compile();

    openaiService = moduleRef.get<OpenaiService>(OpenaiService);
    openaiApi = (openaiService as any).openai;
  });

  describe('getChatResponse', () => {
    it('should return chat completion text', async () => {
      const prompt = 'test prompt';
      const expectedCompletionText = 'test completion text';
      openaiApi.createChatCompletion.mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: expectedCompletionText,
              },
            },
          ],
        },
      });

      const response = await openaiService.getChatResponse(prompt);
      expect(response).toEqual(expectedCompletionText.trim());
    });

    it('should return default message on error', async () => {
      const prompt = 'test prompt';
      const errorMessage = 'Error message';
      openaiApi.createChatCompletion.mockRejectedValue(new Error(errorMessage));

      const response = await openaiService.getChatResponse(prompt);
      expect(response).toEqual(
        'default msg bc I still dont have a subscription for the API...',
      );
    });
  });

  describe('getImageResponse', () => {
    it('should return image data URL', async () => {
      const prompt = 'test prompt';
      const expectedDataURL = 'https://example.com/image.png';
      openaiApi.createImage.mockResolvedValue({
        data: {
          data: [
            {
              url: expectedDataURL,
            },
          ],
        },
      });

      const response = await openaiService.getImageResponse(prompt);
      expect(response).toEqual(expectedDataURL);
    });

    it('should return default message on error', async () => {
      const prompt = 'test prompt';
      const errorMessage = 'Error message';
      openaiApi.createImage.mockRejectedValue(new Error(errorMessage));

      const response = await openaiService.getImageResponse(prompt);
      expect(response).toEqual(
        'default msg bc I still dont have a subscription for the API...',
      );
    });
  });
});
