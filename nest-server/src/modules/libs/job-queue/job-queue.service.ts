import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { TResetPasswordMailData } from 'src/common/types/mail.type';
import {
  EJobName,
  EQueueName
} from 'src/modules/libs/job-queue/enum/job-queue.enum';

@Injectable()
export class JobQueueService {
  constructor(
    @InjectQueue(EQueueName.SENDING_EMAIL) private emailQueue: Queue
  ) {}

  sendResetPasswordMail = async (data: TResetPasswordMailData) => {
    const job = await this.emailQueue.add(EJobName.RESET_PASSWORD, data);
    return job;
  };
}
