-- AlterTable
ALTER TABLE `question` ADD COLUMN `parentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
