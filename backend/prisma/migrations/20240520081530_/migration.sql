/*
  Warnings:

  - You are about to drop the column `speciality` on the `Group` table. All the data in the column will be lost.
  - Added the required column `qualificationId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "speciality",
ADD COLUMN     "qualificationId" INTEGER NOT NULL,
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
