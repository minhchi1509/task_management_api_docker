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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ApiExceptionResponse } from 'src/common/decorators/common.decorator';
import { CheckPermission } from 'src/common/decorators/metadata.decorator';
import { UserId } from 'src/common/decorators/request-object.decorator';
import { RoomGuard } from 'src/common/guards/room.guard';
import { CommentService } from 'src/modules/apis/comment/comment.service';
import { CreateCommentBodyDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentBody.dto';
import { CreateCommentResponseDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentResponse.dto';
import { DeleteCommentResponseDTO } from 'src/modules/apis/comment/dto/delete-comment/DeleteCommentResponse.dto';
import { GetTaskCommentsResponseDTO } from 'src/modules/apis/comment/dto/get-task-comments/GetTaskCommentsResponse.dto';
import { UpdateCommentBodyDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentBody.dto';
import { UpdateCommentResponseDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentResponse.dto';
import { CreateCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/CreateCommentPermissionHandler';
import { DeleteCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/DeleteCommentPermissionHandler';
import { GetTaskCommentsPermissionHandler } from 'src/modules/permission-handler/comment/handlers/GetTaskCommentsPermissionHandler';
import { UpdateCommentPermissionHandler } from 'src/modules/permission-handler/comment/handlers/UpdateCommentPermissionHandler';

@ApiTags('Comment')
@ApiBearerAuth()
@ApiExceptionResponse()
@Controller('rooms/:roomId/tasks/:taskId/comments')
@UseGuards(RoomGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @CheckPermission(GetTaskCommentsPermissionHandler)
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
  @CheckPermission(CreateCommentPermissionHandler)
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
  @CheckPermission(UpdateCommentPermissionHandler)
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
  @CheckPermission(DeleteCommentPermissionHandler)
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
