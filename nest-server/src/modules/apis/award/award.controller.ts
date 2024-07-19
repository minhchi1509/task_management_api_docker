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
import { RoomGuard } from 'src/common/guards/room.guard';
import { AwardService } from 'src/modules/apis/award/award.service';
import { CreateAwardBodyDTO } from 'src/modules/apis/award/dto/create-award/CreateAwardBody.dto';
import { CreateAwardResponseDTO } from 'src/modules/apis/award/dto/create-award/CreateAwardResponse.dto';
import { DeleteAwardResponseDTO } from 'src/modules/apis/award/dto/delete-award/DeleteAwardResponse.dto';
import { GetAvailableAwardResponseDTO } from 'src/modules/apis/award/dto/get-available-awards/GetAvailableAwardResponse.dto';
import { GetReceivedAwardsResponseDTO } from 'src/modules/apis/award/dto/get-received-awards/GetReceivedAwardsResponse.dto';
import { RetrieveAwardResponseDTO } from 'src/modules/apis/award/dto/retrieve-award/RetrieveAwardResponse.dto';
import { UpdateAwardBodyDTO } from 'src/modules/apis/award/dto/update-award/UpdateAwardBody.dto';
import { UpdateAwardResponseDTO } from 'src/modules/apis/award/dto/update-award/UpdateAwardResponse.dto';
import { GetAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/GetAwardPolicyHandler';
import { ModifyAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/ModifyAwardPolicyHandler';
import { ReceiveAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/ReceiveAwardPolicyHandler';

@ApiTags('Award')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('rooms/:roomId/awards')
@UseGuards(RoomGuard)
export class AwardController {
  constructor(private awardService: AwardService) {}

  @Post('create')
  @CheckPolicy(ModifyAwardPolicyHandler)
  async createAward(
    @Param('roomId') roomId: string,
    @Body() body: CreateAwardBodyDTO
  ): Promise<CreateAwardResponseDTO> {
    const responseData = await this.awardService.createAward(roomId, body);
    return plainToInstance(CreateAwardResponseDTO, responseData);
  }

  @Put(':awardId')
  @CheckPolicy(ModifyAwardPolicyHandler)
  async updateAward(
    @Param('roomId') roomId: string,
    @Param('awardId') awardId: string,
    @Body() body: UpdateAwardBodyDTO
  ): Promise<UpdateAwardResponseDTO> {
    const responseData = await this.awardService.updateAward(
      roomId,
      awardId,
      body
    );
    return plainToInstance(UpdateAwardResponseDTO, responseData);
  }

  @Delete(':awardId')
  @CheckPolicy(ModifyAwardPolicyHandler)
  async deleteAward(
    @Param('roomId') roomId: string,
    @Param('awardId') awardId: string
  ): Promise<DeleteAwardResponseDTO> {
    const responseData = await this.awardService.deleteAward(roomId, awardId);
    return plainToInstance(DeleteAwardResponseDTO, responseData);
  }

  @Get('available')
  @CheckPolicy(GetAwardPolicyHandler)
  async getAvailableAwards(
    @Param('roomId') roomId: string,
    @UserId() userId: string
  ): Promise<GetAvailableAwardResponseDTO> {
    const responseData = await this.awardService.getAvailableAwards(
      roomId,
      userId
    );
    return plainToInstance(GetAvailableAwardResponseDTO, responseData);
  }

  @Get('received')
  @CheckPolicy(GetAwardPolicyHandler)
  async getReceivedAwards(
    @Param('roomId') roomId: string,
    @UserId() userId: string
  ): Promise<GetReceivedAwardsResponseDTO> {
    const responseData = await this.awardService.getReceivedAwards(
      roomId,
      userId
    );
    return plainToInstance(GetReceivedAwardsResponseDTO, responseData);
  }

  @Post(':awardId/receive')
  @CheckPolicy(ReceiveAwardPolicyHandler)
  async receiveAward(
    @Param('roomId') roomId: string,
    @Param('awardId') awardId: string,
    @UserId() userId: string
  ): Promise<RetrieveAwardResponseDTO> {
    const responseData = await this.awardService.receiveAward(
      roomId,
      awardId,
      userId
    );
    return plainToInstance(RetrieveAwardResponseDTO, responseData);
  }
}
