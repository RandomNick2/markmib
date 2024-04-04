/*
  Warnings:

  - You are about to drop the column `lessonDate` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Grade` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('DEFAULT', 'RO');

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "lessonDate",
DROP COLUMN "type",
ADD COLUMN     "lessonId" INTEGER;

-- DropEnum
DROP TYPE "GradeType";

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "type" "LessonType" NOT NULL DEFAULT 'DEFAULT',
    "date" TIMESTAMP(3) NOT NULL,
    "journalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
