import { Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

import { TResetPasswordMailData } from 'src/common/types/mail.type';
import {
  EJobName,
  EQueueName
} from 'src/modules/libs/job-queue/enum/job-queue.enum';

@Processor(EQueueName.SENDING_EMAIL)
export class EmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(EJobName.RESET_PASSWORD)
  async sendResetPasswordEmail(job: Job<TResetPasswordMailData>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data.to,
      subject: 'Reset your password',
      template: './reset-password',
      context: data.context
    });
    console.log('Mail has been sent successfully!');
  }
}
