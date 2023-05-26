-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "mobileno" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "ispwdupgraded" BOOLEAN NOT NULL DEFAULT false,
    "lastaccessdate" TIMESTAMP(3),
    "lastchangepwd" TIMESTAMP(3),
    "isstudent" BOOLEAN NOT NULL DEFAULT false,
    "isteacher" BOOLEAN NOT NULL DEFAULT false,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER,
    "updatedbyid" INTEGER,
    "studentid" INTEGER,
    "teacherid" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "faculties" (
    "facultyid" SERIAL NOT NULL,
    "facultyname" TEXT NOT NULL,
    "facultyslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "managerid" INTEGER NOT NULL,
    "deputyid" INTEGER,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("facultyid")
);

-- CreateTable
CREATE TABLE "shifts" (
    "shiftid" SERIAL NOT NULL,
    "shiftname" TEXT NOT NULL,
    "shiftslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,
    "facultyid" INTEGER NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("shiftid")
);

-- CreateTable
CREATE TABLE "students" (
    "studentid" SERIAL NOT NULL,
    "stdid" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "mobileno" TEXT NOT NULL,
    "email" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("studentid")
);

-- CreateTable
CREATE TABLE "student_classes" (
    "studentid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,

    CONSTRAINT "student_classes_pkey" PRIMARY KEY ("classid","studentid")
);

-- CreateTable
CREATE TABLE "classes" (
    "classid" SERIAL NOT NULL,
    "classname" TEXT NOT NULL,
    "classslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,
    "shiftid" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("classid")
);

-- CreateTable
CREATE TABLE "class_semisters" (
    "classid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,
    "isstarted" BOOLEAN NOT NULL DEFAULT false,
    "startdate" TIMESTAMP(3) NOT NULL,
    "isended" BOOLEAN NOT NULL DEFAULT false,
    "enddate" TIMESTAMP(3) NOT NULL,
    "isgoingon" BOOLEAN NOT NULL DEFAULT false,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER NOT NULL,

    CONSTRAINT "class_semisters_pkey" PRIMARY KEY ("classid","semisterid")
);

-- CreateTable
CREATE TABLE "semisters" (
    "semisterid" SERIAL NOT NULL,
    "semistername" TEXT NOT NULL,
    "semisterslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semisters_pkey" PRIMARY KEY ("semisterid")
);

-- CreateTable
CREATE TABLE "course_semisters" (
    "courseid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "classsemisterid" INTEGER NOT NULL,
    "assignedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER NOT NULL,

    CONSTRAINT "course_semisters_pkey" PRIMARY KEY ("courseid","semisterid","teacherid","classid")
);

-- CreateTable
CREATE TABLE "courses" (
    "courseid" SERIAL NOT NULL,
    "coursename" TEXT NOT NULL,
    "courseslug" TEXT NOT NULL,
    "description" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER NOT NULL,
    "updatedbyid" INTEGER,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("courseid")
);

-- CreateTable
CREATE TABLE "teachers" (
    "teacherid" SERIAL NOT NULL,
    "techid" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "mobileno" TEXT NOT NULL,
    "email" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacherid")
);

-- CreateTable
CREATE TABLE "attendances" (
    "attendanceid" SERIAL NOT NULL,
    "attendancedate" TIMESTAMP(3) NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdbyid" INTEGER NOT NULL,
    "studentid" INTEGER NOT NULL,
    "courseid" INTEGER NOT NULL,
    "semisterid" INTEGER NOT NULL,
    "teacherid" INTEGER NOT NULL,
    "classid" INTEGER NOT NULL,
    "statusid" INTEGER NOT NULL,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("attendanceid")
);

-- CreateTable
CREATE TABLE "attendacestatuses" (
    "statusid" SERIAL NOT NULL,
    "statusname" TEXT NOT NULL,
    "statusslug" TEXT NOT NULL,

    CONSTRAINT "attendacestatuses_pkey" PRIMARY KEY ("statusid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobileno_key" ON "users"("mobileno");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_studentid_key" ON "users"("studentid");

-- CreateIndex
CREATE UNIQUE INDEX "users_teacherid_key" ON "users"("teacherid");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_facultyslug_key" ON "faculties"("facultyslug");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_managerid_key" ON "faculties"("managerid");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_deputyid_key" ON "faculties"("deputyid");

-- CreateIndex
CREATE UNIQUE INDEX "shifts_shiftslug_key" ON "shifts"("shiftslug");

-- CreateIndex
CREATE UNIQUE INDEX "students_stdid_key" ON "students"("stdid");

-- CreateIndex
CREATE UNIQUE INDEX "students_mobileno_key" ON "students"("mobileno");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "classes_classslug_key" ON "classes"("classslug");

-- CreateIndex
CREATE UNIQUE INDEX "semisters_semisterslug_key" ON "semisters"("semisterslug");

-- CreateIndex
CREATE UNIQUE INDEX "courses_courseslug_key" ON "courses"("courseslug");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_techid_key" ON "teachers"("techid");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_mobileno_key" ON "teachers"("mobileno");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "attendacestatuses_statusslug_key" ON "attendacestatuses"("statusslug");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "students"("studentid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "teachers"("teacherid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_managerid_fkey" FOREIGN KEY ("managerid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_deputyid_fkey" FOREIGN KEY ("deputyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_facultyid_fkey" FOREIGN KEY ("facultyid") REFERENCES "faculties"("facultyid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_classid_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_shiftid_fkey" FOREIGN KEY ("shiftid") REFERENCES "shifts"("shiftid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semisters" ADD CONSTRAINT "class_semisters_classid_fkey" FOREIGN KEY ("classid") REFERENCES "classes"("classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semisters" ADD CONSTRAINT "class_semisters_semisterid_fkey" FOREIGN KEY ("semisterid") REFERENCES "semisters"("semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semisters" ADD CONSTRAINT "class_semisters_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_semisters" ADD CONSTRAINT "class_semisters_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_semisters" ADD CONSTRAINT "course_semisters_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "courses"("courseid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_semisters" ADD CONSTRAINT "course_semisters_semisterid_fkey" FOREIGN KEY ("semisterid") REFERENCES "semisters"("semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_semisters" ADD CONSTRAINT "course_semisters_teacherid_fkey" FOREIGN KEY ("teacherid") REFERENCES "teachers"("teacherid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_semisters" ADD CONSTRAINT "course_semisters_classid_classsemisterid_fkey" FOREIGN KEY ("classid", "classsemisterid") REFERENCES "class_semisters"("classid", "semisterid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_semisters" ADD CONSTRAINT "course_semisters_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_courseid_semisterid_teacherid_classid_fkey" FOREIGN KEY ("courseid", "semisterid", "teacherid", "classid") REFERENCES "course_semisters"("courseid", "semisterid", "teacherid", "classid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_statusid_fkey" FOREIGN KEY ("statusid") REFERENCES "attendacestatuses"("statusid") ON DELETE RESTRICT ON UPDATE CASCADE;
