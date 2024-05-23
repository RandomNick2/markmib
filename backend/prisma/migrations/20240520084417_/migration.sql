/*
  Warnings:

  - You are about to drop the column `specialtyId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `Specialty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialityId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_specialtyId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "specialtyId",
ADD COLUMN     "specialityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Specialty";

-- CreateTable
CREATE TABLE "Speciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Speciality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Speciality_name_key" ON "Speciality"("name");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
