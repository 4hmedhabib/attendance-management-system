-- AlterTable
ALTER TABLE "users" ADD COLUMN     "groupid" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "groups"("groupid") ON DELETE SET NULL ON UPDATE CASCADE;
