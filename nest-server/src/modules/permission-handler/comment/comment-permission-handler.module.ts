import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { CreateCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/CreateCommentPermissionHandler';
import { DeleteCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/DeleteCommentPermissionHandler';
import { GetTaskCommentsPermissionHandler } from 'src/modules/permission-handler/comment/handlers/GetTaskCommentsPermissionHandler';
import { UpdateCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/UpdateCommentPermissionHandler';

@Module({
  imports: [PrismaModule],
  providers: [
    GetTaskCommentsPermissionHandler,
    CreateCommentPermissionHandler,
    UpdateCommentPermissionHandler,
    DeleteCommentPermissionHandler
  ],
  exports: [
    GetTaskCommentsPermissionHandler,
    CreateCommentPermissionHandler,
    UpdateCommentPermissionHandler,
    DeleteCommentPermissionHandler
  ]
})
export class CommentPermissionHandlerModule {}
