/*
  Warnings:

  - A unique constraint covering the columns `[user_id,room_id]` on the table `room_member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `room_member_user_id_room_id_key` ON `room_member`(`user_id`, `room_id`);
