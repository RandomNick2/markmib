/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exp` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "exp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_agent" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
