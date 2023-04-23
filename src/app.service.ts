import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Method to return example data
  getExampleData(name: string): string {
    return `Hello${name ? ' ' + name : ''}, this is your example data!`;
  }
}
