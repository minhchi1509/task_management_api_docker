-- CreateTable
CREATE TABLE `avatar` (
    `id` VARCHAR(191) NOT NULL,
    `cloud_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `avatar_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avatar` ADD CONSTRAINT `avatar_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
