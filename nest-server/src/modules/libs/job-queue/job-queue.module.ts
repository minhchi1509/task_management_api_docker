import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { EmailConsumer } from 'src/modules/libs/job-queue/consumer/email.consumer';
import { EQueueName } from 'src/modules/libs/job-queue/enum/job-queue.enum';
import { JobQueueService } from 'src/modules/libs/job-queue/job-queue.service';

@Module({
  imports: [BullModule.registerQueue({ name: EQueueName.SENDING_EMAIL })],
  providers: [EmailConsumer, JobQueueService],
  exports: [JobQueueService]
})
export class JobQueueModule {}
