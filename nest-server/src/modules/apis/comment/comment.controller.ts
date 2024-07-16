import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CheckPolicy } from 'src/common/decorators/metadata.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { RoomPolicyGuard } from 'src/common/guards/room-policy.guard';
import { CommentService } from 'src/modules/apis/comment/comment.service';
import { CreateCommentBodyDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentBody.dto';
import { CreateCommentResponseDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentResponse.dto';
import { DeleteCommentResponseDTO } from 'src/modules/apis/comment/dto/delete-comment/DeleteCommentResponse.dto';
import { GetTaskCommentsResponseDTO } from 'src/modules/apis/comment/dto/get-task-comments/GetTaskCommentsResponse.dto';
import { UpdateCommentBodyDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentBody.dto';
import { UpdateCommentResponseDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentResponse.dto';
import { CreateCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/CreateCommentPolicyHandler';
import { DeleteCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/DeleteCommentPolicyHandler';
import { GetTaskCommentsPolicyHandler } from 'src/modules/policy-handler/comment/handlers/GetTaskCommentsPolicyHandler';
import { UpdateCommentPolicyHandler } from 'src/modules/policy-handler/comment/handlers/UpdateCommentPolicyHandler';

@ApiTags('Comment')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('rooms/:roomId/tasks/:taskId/comments')
@UseGuards(RoomPolicyGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @CheckPolicy(GetTaskCommentsPolicyHandler)
  async getTaskComments(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string
  ): Promise<GetTaskCommentsResponseDTO> {
    const responseData = await this.commentService.getTaskComments(
      roomId,
      taskId
    );
    return plainToInstance(GetTaskCommentsResponseDTO, responseData);
  }

  @Post('create')
  @CheckPolicy(CreateCommentPolicyHandler)
  async createTaskComment(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @UserId() userId: string,
    @Body() body: CreateCommentBodyDTO
  ): Promise<CreateCommentResponseDTO> {
    const responseData = await this.commentService.createTaskComment(
      roomId,
      taskId,
      userId,
      body
    );
    return plainToInstance(CreateCommentResponseDTO, responseData);
  }

  @Put(':commentId')
  @CheckPolicy(UpdateCommentPolicyHandler)
  async updateTaskComment(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @UserId() userId: string,
    @Body() body: UpdateCommentBodyDTO
  ): Promise<UpdateCommentResponseDTO> {
    const responseData = await this.commentService.updateTaskComment(
      commentId,
      userId,
      body
    );
    return plainToInstance(UpdateCommentResponseDTO, responseData);
  }

  @Delete(':commentId')
  @CheckPolicy(DeleteCommentPolicyHandler)
  async deleteTaskComment(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @UserId() userId: string
  ): Promise<DeleteCommentResponseDTO> {
    const responseData = await this.commentService.deleteTaskComment(
      commentId,
      userId
    );
    return plainToInstance(DeleteCommentResponseDTO, responseData);
  }
}
