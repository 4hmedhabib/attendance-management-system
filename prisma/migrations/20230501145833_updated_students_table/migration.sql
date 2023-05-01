/*
  Warnings:

  - You are about to drop the column `email` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `teachers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "students_email_key";

-- DropIndex
DROP INDEX "teachers_email_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "email",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "yearofstudy" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "email";
