/*
  Warnings:

  - You are about to drop the column `classid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `courseid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `semisterid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `teacherid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the `course_semisters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `enrollmentid` to the `attendances` table without a default value. This is not possible if the table is not empty.

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

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "classid",
DROP COLUMN "courseid",
DROP COLUMN "semisterid",
DROP COLUMN "teacherid",
ADD COLUMN     "enrollmentid" INTEGER NOT NULL;

-- DropTable
DROP TABLE "course_semisters";

-- CreateTable
CREATE TABLE "semister_courses" (
    "courseid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,

    CONSTRAINT "semister_courses_pkey" PRIMARY KEY ("teacherid","courseid","semisterid","classid")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "enrollment_id" SERIAL NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "studentsStudentid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "courseid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("enrollment_id")
);

-- AddForeignKey
ALTER TABLE "semister_courses" ADD CONSTRAINT "semister_courses_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "courses"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semister_courses" ADD CONSTRAINT "semister_courses_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "teachers"("teacherid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semister_courses" ADD CONSTRAINT "semister_courses_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semister_courses" ADD CONSTRAINT "semister_courses_classid_semisterid_fkey" FOREIGN KEY ("classid", "semisterid") REFERENCES "class_semisters"("classid", "semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_enrollmentid_fkey" FOREIGN KEY ("enrollmentid") REFERENCES "enrollments"("enrollment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studentsStudentid_fkey" FOREIGN KEY ("studentsStudentid") REFERENCES "students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_teacherid_courseid_semisterid_classid_fkey" FOREIGN KEY ("teacherid", "courseid", "semisterid", "classid") REFERENCES "semister_courses"("teacherid", "courseid", "semisterid", "classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
