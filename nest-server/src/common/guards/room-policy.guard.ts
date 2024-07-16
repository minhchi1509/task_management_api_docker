import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Type
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { EMetadataKey, ERequestPayloadKey } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { TJWTPayload } from 'src/modules/libs/jwt-utils/types/jwt.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';
import { RoomAbilityFactory } from 'src/modules/policy/factory/RoomAbilityFactory';

@Injectable()
export class RoomPolicyGuard implements CanActivate {
  constructor(
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private prismaService: PrismaService,
    private roomAbilityFactory: RoomAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const policy = this.reflector.getAllAndOverride<
      Type<IPolicyHandler<TRoomAbility>> | undefined
    >(EMetadataKey.CHECK_POLICY, [context.getClass(), context.getHandler()]);

    if (!policy) {
      return true;
    }

    const roomId = request.params.roomId;
    const user: TJWTPayload = request[ERequestPayloadKey.USER];
    const roomMember = await this.prismaService.roomMember
      .findFirstOrThrow({
        where: { roomId, userId: user.sub }
      })
      .catch(() => {
        throw new NotFoundException('User is not a member of the room');
      });

    const ability = this.roomAbilityFactory.defineAbilityFor(roomMember);
    const policyHandler = this.moduleRef.get(policy, { strict: false });
    const haveAbility = await policyHandler.handle(ability, request);

    if (!haveAbility) {
      throw new ForbiddenException('User does not have permission');
    }

    return true;
  }
}
