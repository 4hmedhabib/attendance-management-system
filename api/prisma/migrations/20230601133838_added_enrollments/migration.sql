/*
  Warnings:

  - You are about to drop the `course_semisters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_courseid_semisterid_teacherid_classid_fkey";

-- DropForeignKey
ALTER TABLE "course_semisters" DROP CONSTRAINT "course_semisters_assignedbyid_fkey";

-- DropForeignKey
ALTER TABLE "course_semisters" DROP CONSTRAINT "course_semisters_classid_classsemisterid_fkey";

-- DropForeignKey
ALTER TABLE "course_semisters" DROP CONSTRAINT "course_semisters_courseid_fkey";

-- DropForeignKey
ALTER TABLE "course_semisters" DROP CONSTRAINT "course_semisters_semisterid_fkey";

-- DropForeignKey
ALTER TABLE "course_semisters" DROP CONSTRAINT "course_semisters_teacherid_fkey";

-- DropTable
DROP TABLE "course_semisters";

-- CreateTable
CREATE TABLE "enrollments" (
    "courseid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "classsemisterid" INTEGER NOT NULL,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,
    "studentid" INTEGER NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("courseid","semisterid","teacherid","classid")
);

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "courses"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_semisterid_fkey" FOREIGN KEY ("semisterid") REFERENCES "semisters"("semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "teachers"("teacherid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_classid_classsemisterid_fkey" FOREIGN KEY ("classid", "classsemisterid") REFERENCES "class_semisters"("classid", "semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_courseid_semisterid_teacherid_classid_fkey" FOREIGN KEY ("courseid", "semisterid", "teacherid", "classid") REFERENCES "enrollments"("courseid", "semisterid", "teacherid", "classid") ON DELETE RESTRICT ON UPDATE CASCADE;
