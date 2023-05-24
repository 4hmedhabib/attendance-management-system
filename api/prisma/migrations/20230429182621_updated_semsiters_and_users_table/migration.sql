/*
  Warnings:

  - Added the required column `createdbyid` to the `semisters` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "semisters" ADD COLUMN     "createdbyid" INTEGER NOT NULL,
ADD COLUMN     "updatedbyid" INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "semisters" ADD CONSTRAINT "semisters_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semisters" ADD CONSTRAINT "semisters_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
