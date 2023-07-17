-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "updatedbyid" INTEGER;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
