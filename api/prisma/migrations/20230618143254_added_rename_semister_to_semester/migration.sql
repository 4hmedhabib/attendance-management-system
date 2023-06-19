/*
  Warnings:

  - You are about to drop the column `classid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `courseid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `semisterid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `studentid` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `teacherid` on the `attendances` table. All the data in the column will be lost.
  - The primary key for the `enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedat` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `assignedbyid` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `classsemisterid` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `semisterid` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the `class_semisters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semisters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `enrollmentid` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdbyid` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment_date` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterid` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_courseid_semisterid_teacherid_classid_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_studentid_fkey";

-- DropForeignKey
ALTER TABLE "class_semisters" DROP CONSTRAINT "class_semisters_assignedbyid_fkey";

-- DropForeignKey
ALTER TABLE "class_semisters" DROP CONSTRAINT "class_semisters_classid_fkey";

-- DropForeignKey
ALTER TABLE "class_semisters" DROP CONSTRAINT "class_semisters_semisterid_fkey";

-- DropForeignKey
ALTER TABLE "class_semisters" DROP CONSTRAINT "class_semisters_updatedbyid_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_assignedbyid_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_classid_classsemisterid_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_courseid_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_semisterid_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_teacherid_fkey";

-- DropForeignKey
ALTER TABLE "semisters" DROP CONSTRAINT "semisters_createdbyid_fkey";

-- DropForeignKey
ALTER TABLE "semisters" DROP CONSTRAINT "semisters_updatedbyid_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "classid",
DROP COLUMN "courseid",
DROP COLUMN "semisterid",
DROP COLUMN "studentid",
DROP COLUMN "teacherid",
ADD COLUMN     "enrollmentid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_pkey",
DROP COLUMN "assignedat",
DROP COLUMN "assignedbyid",
DROP COLUMN "classsemisterid",
DROP COLUMN "semisterid",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdbyid" INTEGER NOT NULL,
ADD COLUMN     "enrollment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "enrollment_id" SERIAL NOT NULL,
ADD COLUMN     "semesterid" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedbyid" INTEGER,
ADD CONSTRAINT "enrollments_pkey" PRIMARY KEY ("enrollment_id");

-- DropTable
DROP TABLE "class_semisters";

-- DropTable
DROP TABLE "semisters";

-- CreateTable
CREATE TABLE "class_semesters" (
    "classid" INTEGER NOT NULL,
    "semesterid" INTEGER NOT NULL,
    "isstarted" BOOLEAN NOT NULL DEFAULT false,
    "startdate" TIMESTAMP(3) NOT NULL,
    "isended" BOOLEAN NOT NULL DEFAULT false,
    "enddate" TIMESTAMP(3) NOT NULL,
    "isgoingon" BOOLEAN NOT NULL DEFAULT false,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER NOT NULL,

    CONSTRAINT "class_semesters_pkey" PRIMARY KEY ("classid","semesterid")
);

-- CreateTable
CREATE TABLE "semesters" (
    "semesterid" SERIAL NOT NULL,
    "semestername" TEXT NOT NULL,
    "semesterslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("semesterid")
);

-- CreateTable
CREATE TABLE "semester_courses" (
    "courseid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "semesterid" INTEGER NOT NULL,

    CONSTRAINT "semester_courses_pkey" PRIMARY KEY ("teacherid","courseid","semesterid","classid")
);

-- CreateIndex
CREATE UNIQUE INDEX "semesters_semesterslug_key" ON "semesters"("semesterslug");

-- AddForeignKey
ALTER TABLE "class_semesters" ADD CONSTRAINT "class_semesters_classid_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semesters" ADD CONSTRAINT "class_semesters_semesterid_fkey" FOREIGN KEY ("semesterid") REFERENCES "semesters"("semesterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semesters" ADD CONSTRAINT "class_semesters_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semesters" ADD CONSTRAINT "class_semesters_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semesters" ADD CONSTRAINT "semesters_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semesters" ADD CONSTRAINT "semesters_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_courses" ADD CONSTRAINT "semester_courses_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "courses"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_courses" ADD CONSTRAINT "semester_courses_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "teachers"("teacherid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_courses" ADD CONSTRAINT "semester_courses_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_courses" ADD CONSTRAINT "semester_courses_classid_semesterid_fkey" FOREIGN KEY ("classid", "semesterid") REFERENCES "class_semesters"("classid", "semesterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_enrollmentid_fkey" FOREIGN KEY ("enrollmentid") REFERENCES "enrollments"("enrollment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_teacherid_courseid_semesterid_classid_fkey" FOREIGN KEY ("teacherid", "courseid", "semesterid", "classid") REFERENCES "semester_courses"("teacherid", "courseid", "semesterid", "classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
