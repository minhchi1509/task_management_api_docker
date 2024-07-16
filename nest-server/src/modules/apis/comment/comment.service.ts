import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCommentBodyDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentBody.dto';
import { CreateCommentResponseDTO } from 'src/modules/apis/comment/dto/create-comment/CreateCommentResponse.dto';
import { DeleteCommentResponseDTO } from 'src/modules/apis/comment/dto/delete-comment/DeleteCommentResponse.dto';
import { GetTaskCommentsResponseDTO } from 'src/modules/apis/comment/dto/get-task-comments/GetTaskCommentsResponse.dto';
import { UpdateCommentBodyDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentBody.dto';
import { UpdateCommentResponseDTO } from 'src/modules/apis/comment/dto/update-comment/UpdateCommentResponse.dto';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  getTaskComments = async (
    roomId: string,
    taskId: string
  ): Promise<GetTaskCommentsResponseDTO> => {
    const comments = await this.prismaService.comment.findMany({
      where: { task: { roomId, id: taskId } },
      include: { commentator: { include: { user: true } } }
    });

    const responseData: GetTaskCommentsResponseDTO = {
      comments: comments.map((comment) => ({
        ...comment,
        commentator: {
          ...comment.commentator,
          profile: {
            ...comment.commentator.user
          }
        }
      }))
    };

    return responseData;
  };

  createTaskComment = async (
    roomId: string,
    taskId: string,
    userId: string,
    data: CreateCommentBodyDTO
  ): Promise<CreateCommentResponseDTO> => {
    const { content } = data;

    const roomMember = await this.prismaService.roomMember
      .findFirstOrThrow({
        where: { roomId, userId },
        select: { id: true }
      })
      .catch(() => {
        throw new NotFoundException('Room member not found');
      });

    const createdComment = await this.prismaService.comment.create({
      data: {
        taskId,
        commentatorId: roomMember.id,
        content
      },
      include: {
        commentator: { include: { user: true } }
      }
    });

    const responseData: CreateCommentResponseDTO = {
      message: 'Create comment successfully',
      comment: {
        ...createdComment,
        commentator: {
          ...createdComment.commentator,
          profile: {
            ...createdComment.commentator.user
          }
        }
      }
    };
    return responseData;
  };

  updateTaskComment = async (
    commentId: string,
    userId: string,
    data: UpdateCommentBodyDTO
  ): Promise<UpdateCommentResponseDTO> => {
    const { content } = data;

    const updatedComment = await this.prismaService.comment.update({
      where: { id: commentId },
      data: {
        ...(content && { content })
      },
      include: { commentator: { include: { user: true } } }
    });

    const responseData: UpdateCommentResponseDTO = {
      message: 'Update comment successfully',
      updatedComment: {
        ...updatedComment,
        commentator: {
          ...updatedComment.commentator,
          profile: {
            ...updatedComment.commentator.user
          }
        }
      }
    };
    return responseData;
  };

  deleteTaskComment = async (
    commentId: string,
    userId: string
  ): Promise<DeleteCommentResponseDTO> => {
    const deletedComment = await this.prismaService.comment.delete({
      where: { id: commentId },
      include: { commentator: { include: { user: true } } }
    });

    const responseData: DeleteCommentResponseDTO = {
      message: 'Delete comment successfully',
      deletedComment: {
        ...deletedComment,
        commentator: {
          ...deletedComment.commentator,
          profile: {
            ...deletedComment.commentator.user
          }
        }
      }
    };
    return responseData;
  };
}
