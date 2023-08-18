/*
  Warnings:

  - Added the required column `sessionid` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "sessionid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sessions" (
    "sessionid" SERIAL NOT NULL,
    "sessionuid" TEXT NOT NULL,
    "sessiondate" TIMESTAMP(3) NOT NULL,
    "sessiondesc" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,
    "teacherid" INTEGER NOT NULL,
    "courseid" INTEGER NOT NULL,
    "semesterid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionid")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionuid_key" ON "sessions"("sessionuid");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_sessionid_fkey" FOREIGN KEY ("sessionid") REFERENCES "sessions"("sessionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_teacherid_courseid_semesterid_classid_fkey" FOREIGN KEY ("teacherid", "courseid", "semesterid", "classid") REFERENCES "semester_courses"("teacherid", "courseid", "semesterid", "classid") ON DELETE RESTRICT ON UPDATE CASCADE;
