import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('metrics')
@ApiTags('metrics')
export class MetricsController {
  @Get()
  @ApiOperation({ summary: 'Get metrics' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  }
}
