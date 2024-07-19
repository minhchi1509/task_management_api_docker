import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentPermissionHandlerModule } from 'src/modules/permission-handler/comment/comment-permission-handler.module';

@Module({
  imports: [CommentPermissionHandlerModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
