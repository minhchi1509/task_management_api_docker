import { Module } from '@nestjs/common';

import { CreateCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/CreateCommentPolicyHandler';
import { DeleteCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/DeleteCommentPolicyHandler';
import { GetTaskCommentsPolicyHandler } from 'src/modules/policy-handler/comment/handlers/GetTaskCommentsPolicyHandler';
import { UpdateCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/UpdateCommentPolicyHandler';

@Module({
  providers: [
    GetTaskCommentsPolicyHandler,
    CreateCommentPolicyHandler,
    UpdateCommentPolicyHandler,
    DeleteCommentPolicyHandler
  ],
  exports: [
    GetTaskCommentsPolicyHandler,
    CreateCommentPolicyHandler,
    UpdateCommentPolicyHandler,
    DeleteCommentPolicyHandler
  ]
})
export class CommentPolicyHandlerModule {}
