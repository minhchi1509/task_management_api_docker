import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { CreateAwardBodyDTO } from 'src/modules/apis/award/dto/create-award/CreateAwardBody.dto';
import { CreateAwardResponseDTO } from 'src/modules/apis/award/dto/create-award/CreateAwardResponse.dto';
import { DeleteAwardResponseDTO } from 'src/modules/apis/award/dto/delete-award/DeleteAwardResponse.dto';
import { GetAvailableAwardResponseDTO } from 'src/modules/apis/award/dto/get-available-awards/GetAvailableAwardResponse.dto';
import { GetReceivedAwardsResponseDTO } from 'src/modules/apis/award/dto/get-received-awards/GetReceivedAwardsResponse.dto';
import { RetrieveAwardResponseDTO } from 'src/modules/apis/award/dto/retrieve-award/RetrieveAwardResponse.dto';
import { UpdateAwardBodyDTO } from 'src/modules/apis/award/dto/update-award/UpdateAwardBody.dto';
import { UpdateAwardResponseDTO } from 'src/modules/apis/award/dto/update-award/UpdateAwardResponse.dto';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class AwardService {
  constructor(private prismaService: PrismaService) {}

  createAward = async (
    roomId: string,
    awardData: CreateAwardBodyDTO
  ): Promise<CreateAwardResponseDTO> => {
    const { name, description, minScore } = awardData;
    const createdAward = await this.prismaService.award.create({
      data: {
        name,
        description,
        minScore,
        roomId
      }
    });
    const responseData: CreateAwardResponseDTO = {
      message: 'Award created successfully',
      createdAward: createdAward
    };
    return responseData;
  };

  updateAward = async (
    roomId: string,
    awardId: string,
    awardData: UpdateAwardBodyDTO
  ): Promise<UpdateAwardResponseDTO> => {
    await this.checkAwardExistence(roomId, awardId);

    const { name, description, minScore } = awardData;
    const updatedAward = await this.prismaService.award.update({
      where: { id: awardId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(minScore && { minScore })
      }
    });
    const responseData: UpdateAwardResponseDTO = {
      message: 'Award updated successfully',
      updatedAward: updatedAward
    };
    return responseData;
  };

  deleteAward = async (
    roomId: string,
    awardId: string
  ): Promise<DeleteAwardResponseDTO> => {
    await this.checkAwardExistence(roomId, awardId);

    const deletedAward = await this.prismaService.award.delete({
      where: { id: awardId }
    });

    const responseData: DeleteAwardResponseDTO = {
      message: 'Award deleted successfully',
      deletedAward: deletedAward
    };
    return responseData;
  };

  getAvailableAwards = async (
    roomId: string,
    userId: string
  ): Promise<GetAvailableAwardResponseDTO> => {
    const memberInformation = await this.prismaService.roomMember
      .findFirstOrThrow({
        where: { userId, roomId },
        include: { user: true }
      })
      .catch(() => {
        throw new NotFoundException('Member not found');
      });

    const availableAwards = await this.prismaService.award.findMany({
      where: { roomId, awardReceivers: { none: { userId } } }
    });

    const responseData: GetAvailableAwardResponseDTO = {
      memberInformation: {
        ...memberInformation,
        profile: memberInformation.user
      },
      awards: availableAwards
    };
    return responseData;
  };

  getReceivedAwards = async (
    roomId: string,
    userId: string
  ): Promise<GetReceivedAwardsResponseDTO> => {
    const memberInformation = await this.prismaService.roomMember
      .findFirstOrThrow({
        where: { userId, roomId },
        include: { user: true }
      })
      .catch(() => {
        throw new NotFoundException('Member not found');
      });

    const availableAwards = await this.prismaService.award.findMany({
      where: { roomId, awardReceivers: { some: { userId } } }
    });

    const responseData: GetReceivedAwardsResponseDTO = {
      memberInformation: {
        ...memberInformation,
        profile: memberInformation.user
      },
      receivedAwards: availableAwards
    };
    return responseData;
  };

  receiveAward = async (
    roomId: string,
    awardId: string,
    userId: string
  ): Promise<RetrieveAwardResponseDTO> => {
    const award = await this.prismaService.award
      .findUniqueOrThrow({
        where: { id: awardId },
        select: { minScore: true }
      })
      .catch(() => {
        throw new NotFoundException('Award not found');
      });

    const roomMember = await this.prismaService.roomMember
      .findFirstOrThrow({
        where: { userId, roomId },
        select: { accumulatedScore: true, id: true }
      })
      .catch(() => {
        throw new NotFoundException('Member not found');
      });

    if (roomMember.accumulatedScore < award.minScore) {
      throw new BadRequestException('Member does not have enough score');
    }

    const retrievedAward = await this.prismaService.award.update({
      where: { id: awardId },
      data: { awardReceivers: { connect: { id: roomMember.id } } }
    });

    const responseData: RetrieveAwardResponseDTO = {
      message: 'Award received successfully',
      retrievedAward: retrievedAward
    };
    return responseData;
  };

  checkAwardExistence = async (
    roomId: string,
    awardId: string
  ): Promise<void> => {
    const award = await this.prismaService.award
      .findFirstOrThrow({
        where: {
          id: awardId,
          roomId
        }
      })
      .catch(() => {
        throw new NotFoundException('Award not found');
      });
  };
}
