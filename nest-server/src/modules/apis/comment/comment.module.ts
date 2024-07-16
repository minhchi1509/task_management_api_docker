import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AppPolicyModule } from 'src/modules/policy/app-policy.module';
import { CommentPolicyHandlerModule } from 'src/modules/policy-handler/comment/comment-policy-handler.module';

@Module({
  imports: [CommentPolicyHandlerModule, AppPolicyModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
