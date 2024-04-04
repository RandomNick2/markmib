/*
  Warnings:

  - The `lessonDate` column on the `Grade` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GradeType" AS ENUM ('GRADE', 'RO');

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "type" "GradeType" NOT NULL DEFAULT 'GRADE',
DROP COLUMN "lessonDate",
ADD COLUMN     "lessonDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
