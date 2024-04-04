/*
  Warnings:

  - You are about to drop the column `userId` on the `Grade` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_userId_fkey";

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
