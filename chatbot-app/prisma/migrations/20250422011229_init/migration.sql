-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chatroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,
    `idChatroom` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chatroom` ADD CONSTRAINT `Chatroom_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_idChatroom_fkey` FOREIGN KEY (`idChatroom`) REFERENCES `Chatroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
