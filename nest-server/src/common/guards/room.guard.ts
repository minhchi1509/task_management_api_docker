import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Type
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { RoomMember, RoomRole } from '@prisma/client';

import {
  EAwardActions,
  ESubTaskActions,
  ETaskActions,
  ETaskCommentActions,
  ETaskTypeActions
} from 'src/common/constants/actions.enum';
import {
  EMetadataKey,
  ERequestPayloadKey
} from 'src/common/constants/common.enum';
import { IPermissionHandler } from 'src/common/types/permission.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { TJWTPayload } from 'src/common/types/token.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class RoomGuard implements CanActivate {
  constructor(
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const policy = this.reflector.getAllAndOverride<
      Type<IPermissionHandler<TRoomAbility>> | undefined
    >(EMetadataKey.CHECK_PERMISSION, [
      context.getClass(),
      context.getHandler()
    ]);

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

    const ability = this.defineAbilityFor(roomMember);
    const policyHandler = this.moduleRef.get(policy, { strict: false });
    const haveAbility = await policyHandler.handle(ability, request);

    if (!haveAbility) {
      throw new ForbiddenException('User does not have permission');
    }

    return true;
  }

  defineAbilityFor(roomMember: RoomMember) {
    const { can, build } = new AbilityBuilder<TRoomAbility>(
      createPrismaAbility
    );
    const { userId } = roomMember;
    can(ETaskCommentActions.UPDATE, 'Comment', {
      commentator: { is: { userId } }
    });

    if (roomMember.role === RoomRole.ADMIN) {
      can(ETaskTypeActions.READ, 'TaskType');
      can(ETaskTypeActions.CREATE, 'TaskType');
      can(ETaskTypeActions.UPDATE, 'TaskType');
      can(ETaskTypeActions.DELETE, 'TaskType');

      can(ETaskActions.READ, 'Task');
      can(ETaskActions.CREATE, 'Task');
      can(ETaskActions.UPDATE, 'Task');
      can(ETaskActions.DELETE, 'Task');

      can(EAwardActions.READ, 'Award');
      can(EAwardActions.CREATE, 'Award');
      can(EAwardActions.UPDATE, 'Award');
      can(EAwardActions.DELETE, 'Award');

      can(ESubTaskActions.UPDATE_STATUS, 'SubTask');

      can(ETaskCommentActions.READ, 'Task');
      can(ETaskCommentActions.CREATE, 'Task');
      can(ETaskCommentActions.DELETE, 'Comment');
    } else {
      can(ETaskActions.READ, 'Task');
      can(ETaskTypeActions.READ, 'TaskType');

      can(ESubTaskActions.UPDATE_STATUS, 'SubTask', {
        task: { is: { performers: { some: { userId } } } }
      });

      can(EAwardActions.READ, 'Award');
      can(EAwardActions.RECEIVE, 'Award');

      can(ETaskCommentActions.READ, 'Task', {
        performers: { some: { userId } }
      });
      can(ETaskCommentActions.CREATE, 'Task', {
        performers: { some: { userId } }
      });
      can(ETaskCommentActions.DELETE, 'Comment', {
        commentator: { is: { userId } }
      });
    }
    return build();
  }
}
