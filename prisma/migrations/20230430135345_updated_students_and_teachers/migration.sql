/*
  Warnings:

  - Added the required column `createdbyid` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdbyid` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "createdbyid" INTEGER NOT NULL,
ADD COLUMN     "updatedbyid" INTEGER;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "createdbyid" INTEGER NOT NULL,
ADD COLUMN     "updatedbyid" INTEGER;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
