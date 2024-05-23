-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
