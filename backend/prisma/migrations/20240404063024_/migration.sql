/*
  Warnings:

  - The `value` column on the `Grade` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER;
