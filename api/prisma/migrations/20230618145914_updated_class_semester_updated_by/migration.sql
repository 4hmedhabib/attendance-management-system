-- DropForeignKey
ALTER TABLE "class_semesters" DROP CONSTRAINT "class_semesters_updatedbyid_fkey";

-- AlterTable
ALTER TABLE "class_semesters" ALTER COLUMN "updatedbyid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "class_semesters" ADD CONSTRAINT "class_semesters_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
