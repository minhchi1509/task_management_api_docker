import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { RoomMember, RoomRole } from '@prisma/client';

import {
  EAwardActions,
  ESubTaskActions,
  ETaskActions,
  ETaskCommentActions,
  ETaskTypeActions
} from 'src/common/constants/enum';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class RoomAbilityFactory {
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
