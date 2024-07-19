import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CheckPolicy } from 'src/common/decorators/metadata.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { RoomGuard } from 'src/common/guards/room.guard';
import { CreateRoomBodyDTO } from 'src/modules/apis/room/dto/create-room/CreateRoomBody.dto';
import { CreateRoomResponseDTO } from 'src/modules/apis/room/dto/create-room/CreateRoomResponse.dto';
import { GetAllJoinedRoomResponseDTO } from 'src/modules/apis/room/dto/get-all-joined-room/GetAllJoinedRoomResponse.dto';
import { GetRoomMembersResponseDTO } from 'src/modules/apis/room/dto/get-room-members/GetRoomMembersResponse.dto';
import { JoinRoomResponseDTO } from 'src/modules/apis/room/dto/join-room/JoinRoomResponse.dto';
import { RoomService } from 'src/modules/apis/room/room.service';
import { GetRoomMemberPolicyHandler } from 'src/modules/policy-handler/room/handlers/GetRoomMemberPolicyHandler';

@ApiTags('Room')
@ApiBadRequestResponse({ type: ExceptionResponse })
@ApiBearerAuth()
@Controller('room')
@UseGuards(RoomGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('create')
  async createRoom(
    @Body() body: CreateRoomBodyDTO,
    @UserId() userId: string
  ): Promise<CreateRoomResponseDTO> {
    const response = await this.roomService.createRoom(body, userId);
    return plainToInstance(CreateRoomResponseDTO, response);
  }

  @Post('join/:roomId')
  @HttpCode(HttpStatus.OK)
  async joinRoom(
    @Param('roomId') roomId: string,
    @UserId() userId: string
  ): Promise<JoinRoomResponseDTO> {
    const response = await this.roomService.joinRoom(roomId, userId);
    return plainToInstance(JoinRoomResponseDTO, response);
  }

  @Get('joined')
  async getJoinedRooms(
    @UserId() userId: string
  ): Promise<GetAllJoinedRoomResponseDTO> {
    const response = await this.roomService.getJoinedRooms(userId);
    return plainToInstance(GetAllJoinedRoomResponseDTO, response);
  }

  @Get(':roomId/members')
  @CheckPolicy(GetRoomMemberPolicyHandler)
  async getRoomMembers(
    @Param('roomId') roomId: string
  ): Promise<GetRoomMembersResponseDTO> {
    const response = await this.roomService.getRoomMembers(roomId);
    return plainToInstance(GetRoomMembersResponseDTO, response);
  }
}
