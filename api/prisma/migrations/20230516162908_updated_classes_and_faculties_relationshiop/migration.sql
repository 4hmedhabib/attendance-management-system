-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "facultyid" INTEGER;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_facultyid_fkey" FOREIGN KEY ("facultyid") REFERENCES "faculties"("facultyid") ON DELETE SET NULL ON UPDATE CASCADE;
