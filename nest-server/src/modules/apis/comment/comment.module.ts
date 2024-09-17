import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { CommentPermissionHandlerModule } from 'src/modules/permission-handler/comment/comment-permission-handler.module';

@Module({
  imports: [CommentPermissionHandlerModule, PrismaModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
