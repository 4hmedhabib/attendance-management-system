/*
  Warnings:

  - You are about to drop the column `facultyid` on the `shifts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_facultyid_fkey";

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "facultyid" INTEGER;

-- AlterTable
ALTER TABLE "shifts" DROP COLUMN "facultyid";

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_facultyid_fkey" FOREIGN KEY ("facultyid") REFERENCES "faculties"("facultyid") ON DELETE SET NULL ON UPDATE CASCADE;
