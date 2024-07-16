import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { Award, Comment, Room, SubTask, Task, TaskType } from '@prisma/client';

type TRoomAbilitySubjects =
  | Subjects<{
      Room: Room;
      TaskType: TaskType;
      Task: Task;
      SubTask: SubTask;
      Comment: Comment;
      Award: Award;
    }>
  | 'all';

export type TRoomAbility = PureAbility<
  [string, TRoomAbilitySubjects],
  PrismaQuery
>;
