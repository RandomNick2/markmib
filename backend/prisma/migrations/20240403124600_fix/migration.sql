/*
  Warnings:

  - You are about to drop the column `userId` on the `Journal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_userId_fkey";

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "userId",
ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
