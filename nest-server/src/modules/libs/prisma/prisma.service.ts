import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('🚀 Connect to database successfully!');
    } catch (error) {
      await this.$disconnect();
      throw new Error(
        `❌ Connect to database failed: ${(error as Error).message}`
      );
    }
  }
}
