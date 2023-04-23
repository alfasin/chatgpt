import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('example')
@Controller('example')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get example data' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiQuery({ name: 'name', required: false, description: 'Your name' })
  getExampleData(@Query('name') name?: string): string {
    // Log the query parameter (name) if provided
    if (name) {
      this.logger.log(`Name query parameter: ${name}`);
    } else {
      this.logger.log('No name query parameter provided');
    }

    return this.appService.getExampleData(name);
  }
}
