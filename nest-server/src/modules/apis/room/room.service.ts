import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { RoomRole } from '@prisma/client';

import { RoomMemberResponseDTO } from 'src/common/dto/RoomMemberResponse.dto';
import { CreateRoomBodyDTO } from 'src/modules/apis/room/dto/create-room/CreateRoomBody.dto';
import { CreateRoomResponseDTO } from 'src/modules/apis/room/dto/create-room/CreateRoomResponse.dto';
import { GetAllJoinedRoomResponseDTO } from 'src/modules/apis/room/dto/get-all-joined-room/GetAllJoinedRoomResponse.dto';
import { GetRoomMembersResponseDTO } from 'src/modules/apis/room/dto/get-room-members/GetRoomMembersResponse.dto';
import { JoinRoomResponseDTO } from 'src/modules/apis/room/dto/join-room/JoinRoomResponse.dto';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';
import { ShortUniqueIdService } from 'src/modules/libs/short-id/short-id.service';

@Injectable()
export class RoomService {
  constructor(
    private shortUniqueIdService: ShortUniqueIdService,
    private prismaService: PrismaService
  ) {}

  createRoom = async (
    roomData: CreateRoomBodyDTO,
    userId: string
  ): Promise<CreateRoomResponseDTO> => {
    const { name, description } = roomData;
    const createdRoom = await this.prismaService.room.create({
      data: {
        id: this.shortUniqueIdService.randomUUID(),
        name,
        ...(description && { description }),
        roomMembers: { create: { userId, role: 'ADMIN' } }
      }
    });
    return {
      message: 'Create room successfully',
      data: { ...createdRoom }
    };
  };

  joinRoom = async (
    roomId: string,
    userId: string
  ): Promise<JoinRoomResponseDTO> => {
    await this.checkRoomExistence(roomId);

    const roomMember = await this.prismaService.roomMember.findFirst({
      where: { roomId, userId }
    });
    if (roomMember) {
      throw new BadRequestException('User is already in the room');
    }
    const createdRoomMember = await this.prismaService.roomMember.create({
      data: {
        userId,
        roomId,
        role: 'MEMBER'
      },
      include: {
        room: true
      }
    });
    return {
      message: 'Join room successfully',
      room: { ...createdRoomMember.room }
    };
  };

  async getJoinedRooms(userId: string): Promise<GetAllJoinedRoomResponseDTO> {
    const profile = await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: userId }
      })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    const joinedRooms = await this.prismaService.room.findMany({
      where: { roomMembers: { some: { userId } } },
      include: { roomMembers: { where: { userId } } }
    });

    const responseData: GetAllJoinedRoomResponseDTO = {
      profile,
      joinedRooms: joinedRooms.map((room) => ({
        role: room.roomMembers[0]?.role as RoomRole,
        room: { ...room }
      }))
    };
    return responseData;
  }

  async getRoomMembers(roomId: string): Promise<GetRoomMembersResponseDTO> {
    const data = await this.prismaService.room
      .findUniqueOrThrow({
        where: { id: roomId },
        include: { roomMembers: { include: { user: true } } }
      })
      .catch(() => {
        throw new NotFoundException('Room not found');
      });

    const membersResponse: RoomMemberResponseDTO[] = data.roomMembers.map(
      (member) => ({
        id: member.id,
        profile: {
          id: member.user.id,
          fullName: member.user.fullName,
          email: member.user.email,
          avatar: member.user.avatar
        },
        joinedAt: member.joinedAt,
        role: member.role,
        accumulatedScore: member.accumulatedScore
      })
    );

    const responseData: GetRoomMembersResponseDTO = {
      room: { ...data },
      members: membersResponse
    };
    return responseData;
  }

  async checkRoomExistence(roomId: string): Promise<void> {
    const room = await this.prismaService.room
      .findUniqueOrThrow({
        where: { id: roomId }
      })
      .catch(() => {
        throw new NotFoundException('Room not found');
      });
  }
}
