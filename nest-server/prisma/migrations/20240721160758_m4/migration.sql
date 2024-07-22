/*
  Warnings:

  - You are about to drop the `avatar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `avatar` DROP FOREIGN KEY `avatar_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `avatar`;
