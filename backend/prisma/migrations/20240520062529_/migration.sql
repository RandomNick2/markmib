-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_lessonId_fkey";

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
