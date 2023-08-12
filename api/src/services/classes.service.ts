import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { preDefined } from "../constants";
import {
  CreateClassSemesterCourseAttendancePayload,
  CreateClassSemesterCoursesDto,
  CreateClassSemesterDto,
  GetClassSemesterCourseAttendancePayload,
  GetClassesFilters,
  UpdateClassData,
  UpdateClassSemesterCourseAttendancePayload,
} from "../dtos/classes.dto";
import { HttpException } from "../exceptions/httpException";
import {
  IAttendanceStatus,
  IAttendances,
  IClass,
  IClassSemester,
  IClassSemesterCourses,
  IEnrollment,
  IRPCreateClassPayload,
  IShift,
} from "../interfaces";
import { logger, setEndDay, setStartDay } from "../utils";
import { IFaculty } from "./../interfaces/faculties.interface";

const prisma = new PrismaClient();
const classesDB = prisma.classes;
const shiftsDB = prisma.shifts;
const facultiesDB = prisma.faculties;
const semestersDB = prisma.semesters;
const class_semestersDB = prisma.class_semesters;
const semester_coursesDB = prisma.semester_courses;
const coursesDB = prisma.courses;
const teachersDB = prisma.teachers;
const attendancesDB = prisma.attendances;
const enrollmentsDB = prisma.enrollments;
const attendancestatusesDB = prisma.attendacestatuses;
const usersDB = prisma.users;

@Service()
class ClassService {
  public async findAllClass(
    isMiniView: boolean,
    filters: GetClassesFilters
  ): Promise<IClass[]> {
    const classes: IClass[] = await classesDB?.findMany({
      where: {
        faculty: {
          facultyslug: filters.facultySlug ?? undefined,
        },
        shift: {
          shiftslug: filters.shiftSlug ?? undefined,
        },
      },
      select: {
        classid: true,
        classname: true,
        classslug: true,
        createdby: !isMiniView
          ? {
              select: {
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
              },
            }
          : false,
        shift: {
          select: {
            shiftslug: true,
            shiftname: true,
          },
        },
        faculty: !isMiniView
          ? {
              select: {
                facultyslug: !isMiniView,
                facultyname: !isMiniView,
              },
            }
          : false,
        _count: {
          select: {
            semesters: true,
            students: true,
          },
        },
      },
    });

    if (classes.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return classes;
  }

  public async findClassBySlug(
    classSlug: string,
    isMiniView: boolean
  ): Promise<IClass> {
    try {
      const findClass: IClass = await classesDB?.findUnique({
        where: { classslug: classSlug },
        select: {
          classid: !isMiniView,
          classname: true,
          classslug: true,
          description: !isMiniView,
          createdat: !isMiniView,
          updatedat: !isMiniView,
          createdby: !isMiniView
            ? {
                select: {
                  username: !isMiniView,
                  firstname: !isMiniView,
                  middlename: !isMiniView,
                  lastname: !isMiniView,
                },
              }
            : false,
          updatedby: !isMiniView
            ? {
                select: {
                  username: !isMiniView,
                  firstname: !isMiniView,
                  middlename: !isMiniView,
                  lastname: !isMiniView,
                },
              }
            : false,
          shift: !isMiniView
            ? {
                select: {
                  shiftslug: !isMiniView,
                  shiftname: !isMiniView,
                },
              }
            : false,
          faculty: !isMiniView
            ? {
                select: {
                  facultyslug: !isMiniView,
                  facultyname: !isMiniView,
                },
              }
            : false,
          _count: !isMiniView
            ? {
                select: {
                  semesters: !isMiniView,
                  students: !isMiniView,
                },
              }
            : false,
        },
      });

      if (!findClass) throw new HttpException(409, "Class doesn't exist");

      return findClass;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async createClass(classData: IRPCreateClassPayload): Promise<any> {
    let savedData: Prisma.classesCreateInput;

    const findClass = await classesDB?.findUnique({
      where: { classslug: classData.classSlug },
      select: { classid: true, classslug: true, classname: true },
    });

    if (findClass)
      throw new HttpException(
        409,
        `This class ${classData.className} already exists`
      );

    let faculty: IFaculty = await facultiesDB?.findUnique({
      where: { facultyslug: classData.facultySlug || "" },
    });

    if (!faculty)
      throw new HttpException(409, `faculty ${classData.shiftSlug} not found`);

    let shift: IShift = await shiftsDB?.findUnique({
      where: { shiftslug: classData.shiftSlug || "" },
    });

    if (!shift)
      throw new HttpException(409, `shift ${classData.shiftSlug} not found`);

    savedData = {
      ...savedData,
      classname: classData.className,
      classslug: classData.classSlug,
      description: classData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
      shift: {
        connect: {
          shiftid: shift.shiftid,
        },
      },
      faculty: {
        connect: {
          facultyid: faculty.facultyid,
        },
      },
    };

    try {
      const createClassData: IClass = await classesDB?.create({
        data: savedData,
        select: {
          classid: true,
          classname: true,
          classslug: true,
        },
      });

      return createClassData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async createClassSemester(
    classSemesterData: CreateClassSemesterDto
  ): Promise<any> {
    const classData = classSemesterData.payload;
    let savedData: Prisma.class_semestersCreateInput;

    const findClass = await classesDB?.findUnique({
      where: { classslug: classData.classSlug },
      select: { classid: true, classslug: true, classname: true },
    });

    if (!findClass)
      throw new HttpException(
        409,
        `This class ${classData.classSlug} not found`
      );

    let semester: { semesterid: number } = await semestersDB?.findUnique({
      where: { semesterslug: classData.semester.semesterSlug || "" },
      select: { semesterid: true },
    });

    if (!semester)
      throw new HttpException(
        409,
        `semester ${classData.semester.semesterSlug} not found`
      );

    savedData = {
      ...savedData,
      class: {
        connect: {
          classid: findClass.classid,
        },
      },
      semester: {
        connect: {
          semesterid: semester.semesterid,
        },
      },
      assignedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
      startdate: new Date(classData.semester.startDate),
      enddate: new Date(classData.semester.endDate),
    };

    try {
      const createClassSemester: IClassSemester =
        await class_semestersDB?.create({
          data: savedData,
          select: {
            class: {
              select: {
                classid: true,
                classname: true,
                classslug: true,
              },
            },
            semester: {
              select: {
                semesterid: true,
                semestername: true,
                semesterslug: true,
              },
            },
          },
        });

      return createClassSemester;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async updateClass(
    classSlug: string,
    classData: UpdateClassData
  ): Promise<IClass> {
    let updatedData: Prisma.classesUpdateInput;

    const findClass: IClass = await classesDB?.findUnique({
      where: {
        classslug: classSlug,
      },
      select: {
        classid: true,
        classslug: true,
      },
    });

    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const checkClass: IClass = await classesDB?.findUnique({
      where: {
        classslug: classData.classSlug,
      },
      select: {
        classid: true,
        classslug: true,
      },
    });

    // check class slug is duplicate or not
    if (checkClass && checkClass.classid !== findClass.classid)
      throw new HttpException(
        409,
        "This class already exists please check it: " + classData.className
      );

    let faculty: IFaculty = await facultiesDB?.findUnique({
      where: { facultyslug: classData.facultySlug || "" },
    });

    if (!faculty)
      throw new HttpException(409, `faculty ${classData.shiftSlug} not found`);

    let shift: IShift = await shiftsDB?.findUnique({
      where: { shiftslug: classData.shiftSlug || "" },
    });

    if (!shift)
      throw new HttpException(409, `shift ${classData.shiftSlug} not found`);

    updatedData = {
      ...updatedData,
      classname: classData.className,
      classslug: classData.classSlug,
      description: classData.description || null,
      shift: {
        connect: {
          shiftid: shift.shiftid,
        },
      },
      faculty: {
        connect: {
          facultyid: faculty.facultyid,
        },
      },
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateClassData: IClass = await classesDB?.update({
      where: {
        classid: findClass.classid,
      },
      data: updatedData,
      select: {
        classid: true,
        classname: true,
        classslug: true,
        description: true,
        createdat: true,
        updatedat: true,
        createdby: true
          ? {
              select: {
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
              },
            }
          : false,
        updatedby: true
          ? {
              select: {
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
              },
            }
          : false,
        shift: {
          select: {
            shiftslug: true,
            shiftname: true,
          },
        },
        faculty: {
          select: {
            facultyslug: true,
            facultyname: true,
          },
        },
        _count: true
          ? {
              select: {
                semesters: true,
                students: true,
              },
            }
          : false,
      },
    });

    return updateClassData;
  }

  public async deleteClass(classSlug: string): Promise<IClass> {
    const findClass: IClass = await classesDB?.findUnique({
      where: {
        classslug: classSlug,
      },
    });

    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const deleteClassData: IClass = await classesDB?.delete({
      where: {
        classid: findClass.classid,
      },
      select: {
        classid: true,
        classname: true,
        classslug: true,
      },
    });

    return deleteClassData;
  }

  public async findClassSemestersBySlug(
    classSlug: string,
    isMiniView: boolean
  ): Promise<IClassSemester[]> {
    try {
      const findClassSemesters: IClassSemester[] =
        await class_semestersDB?.findMany({
          where: { class: { classslug: classSlug } },
          select: {
            class: { select: { classslug: true, classname: true } },
            semester: { select: { semesterslug: true, semestername: true } },
            assignedby: !isMiniView
              ? {
                  select: {
                    username: !isMiniView,
                    firstname: !isMiniView,
                    middlename: !isMiniView,
                    lastname: !isMiniView,
                  },
                }
              : false,
            updatedby: !isMiniView
              ? {
                  select: {
                    username: !isMiniView,
                    firstname: !isMiniView,
                    middlename: !isMiniView,
                    lastname: !isMiniView,
                  },
                }
              : false,
            startdate: !isMiniView,
            enddate: !isMiniView,
            isgoingon: true,
            isended: true,
            isstarted: true,
            _count: !isMiniView
              ? {
                  select: {
                    courses: !isMiniView,
                  },
                }
              : false,
          },
        });

      if (!findClassSemesters)
        throw new HttpException(409, "Class doesn't exist");

      return findClassSemesters;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async createClassSemesterCourses(
    classSemesterCoursesData: CreateClassSemesterCoursesDto
  ): Promise<any> {
    const classSemesterData = classSemesterCoursesData.payload;
    let savedData: Prisma.semester_coursesCreateManyInput;

    const findClass = await classesDB?.findUnique({
      where: { classslug: classSemesterData.classSlug },
      select: { classid: true, classslug: true, classname: true },
    });

    if (!findClass)
      throw new HttpException(
        409,
        `This class ${classSemesterData.classSlug} not found`
      );

    let findSemester: { semesterid: number } = await semestersDB?.findUnique({
      where: { semesterslug: classSemesterData.semesterSlug || "" },
      select: { semesterid: true },
    });

    if (!findSemester)
      throw new HttpException(
        409,
        `semester ${classSemesterData.semesterSlug} not found`
      );

    // async.map<any, any, number>([], async (err, result) => {
    //   try {
    //     const createClassSemesterCourses: IClassSemesterCourses =
    //       await semester_coursesDB?.createMany({
    //         data: savedData,
    //         skipDuplicates: true,
    //       });

    //     return createClassSemesterCourses;
    //   } catch (err: any) {
    //     console.log(err);

    //     logger.error(JSON.stringify(err.message) || err);
    //     throw new HttpException(
    //       500,
    //       `Something went wrong creating semester coureses, please contact support team.`
    //     );
    //   }
    // });

    const results = await Promise.allSettled(
      classSemesterData.courses.map(async (course) => {
        try {
          let findCourse: { courseid: number } = await coursesDB?.findUnique({
            where: { courseslug: course.courseSlug },
            select: { courseid: true },
          });

          if (!findCourse)
            throw new HttpException(
              409,
              `course ${course.courseSlug} not found`
            );

          let findTeacher: { teacherid: number } = await teachersDB?.findUnique(
            {
              where: { techid: course.teacherId || "" },
              select: { teacherid: true },
            }
          );

          if (!findTeacher)
            throw new HttpException(
              409,
              `teacher ${course.teacherId} not found`
            );

          let findDuplicate = await semester_coursesDB?.findUnique({
            where: {
              teacherid_courseid_semesterid_classid: {
                classid: findClass.classid,
                courseid: findCourse.courseid,
                teacherid: findTeacher.teacherid,
                semesterid: findSemester.semesterid,
              },
            },
            select: { teacherid: true },
          });

          if (findDuplicate)
            throw new HttpException(
              409,
              `semester course ${course.courseSlug} aleardy exists`
            );

          let classSemesterCourse = await semester_coursesDB?.create({
            data: {
              class_semester: {
                connect: {
                  classid_semesterid: {
                    classid: findClass.classid,
                    semesterid: findSemester.semesterid,
                  },
                },
              },
              course: {
                connect: {
                  courseid: findCourse.courseid,
                },
              },
              teacher: {
                connect: {
                  teacherid: findTeacher.teacherid,
                },
              },
              assignedby: {
                connect: {
                  username: "ahmedhabib",
                },
              },
            },
            select: {
              course: { select: { coursename: true, courseslug: true } },
              teacher: {
                select: { firstname: true, middlename: true, techid: true },
              },
            },
          });

          return { success: true, data: classSemesterCourse };
        } catch (err) {
          logger.error(err);
          return { success: false, error: err.message || err };
        }
      })
    );

    const successes = results.filter(
      (r) => r.status === "fulfilled" && r.value.success
    );
    const errors = results.filter(
      (r) => r.status === "rejected" || !r.value.success
    );

    return {
      successes,
      errors,
    };
  }

  public async findClassSemesterCoursesBySlug(
    classSlug: string,
    semesterSlug: string,
    isMiniView: boolean
  ): Promise<IClassSemesterCourses[]> {
    try {
      const findClass = await classesDB?.findUnique({
        where: { classslug: classSlug },
        select: { classid: true, classslug: true, classname: true },
      });

      if (!findClass)
        throw new HttpException(409, `This class ${classSlug} not found`);

      let findSemester: { semesterid: number } = await semestersDB?.findUnique({
        where: { semesterslug: semesterSlug || "" },
        select: { semesterid: true },
      });

      if (!findSemester)
        throw new HttpException(409, `semester ${semesterSlug} not found`);

      const findClassSemesterCourses: IClassSemesterCourses[] =
        await semester_coursesDB?.findMany({
          where: {
            classid: findClass.classid,
            semesterid: findSemester.semesterid,
          },
          select: {
            class_semester: {
              select: {
                courses: {
                  select: {
                    course: {
                      select: {
                        coursename: true,
                        courseslug: true,
                      },
                    },
                  },
                },
                semester: {
                  select: {
                    semestername: true,
                    semesterslug: true,
                  },
                },
                class: {
                  select: {
                    classname: true,
                    classslug: true,
                  },
                },
              },
            },
            teacher: {
              select: {
                firstname: true,
                middlename: true,
                techid: true,
              },
            },
            assignedby: !isMiniView
              ? {
                  select: {
                    username: !isMiniView,
                    firstname: !isMiniView,
                    middlename: !isMiniView,
                    lastname: !isMiniView,
                  },
                }
              : false,

            _count: !isMiniView
              ? {
                  select: {
                    enrollments: !isMiniView,
                  },
                }
              : false,
          },
        });

      return findClassSemesterCourses;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async createClassSemesterCourseAttendances(
    classSemesterCourseAttendancesData: CreateClassSemesterCourseAttendancePayload
  ): Promise<any> {
    const results = await prisma.$transaction(async (trx) => {
      let alreadyExits: number = 0;
      let totalCreated: number = 0;
      let totalErrors: number = 0;

      const classAttendanceData = classSemesterCourseAttendancesData;

      const classByCourse = await trx.semester_courses.findFirst({
        where: {
          course: {
            courseslug: classAttendanceData.courseSlug,
          },
          teacher: {
            techid: classAttendanceData.teacherId,
          },
          class_semester: {
            semester: {
              semesterslug: classAttendanceData.semesterSlug,
            },
            class: {
              classslug: classAttendanceData.classSlug,
            },
          },
        },
        include: {
          enrollments: {
            select: {
              studentid: true,
              enrollment_date: true,
              enrollment_id: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      if (classByCourse._count.enrollments <= 0) {
        throw new HttpException(404, `Sorry!, no students found.`);
      }

      const currentDate = new Date();
      const startDate = setStartDay(currentDate);
      const endDate = setEndDay(currentDate);

      await Promise.allSettled(
        classByCourse.enrollments.map(async (enrollment) => {
          try {
            const findDuplicate = await attendancesDB?.findFirst({
              where: {
                enrollmentid: enrollment.enrollment_id,
                AND: [
                  { attendancedate: { gte: startDate } },
                  { attendancedate: { lte: endDate } },
                ],
              },
              select: { attendancedate: true, attendanceid: true },
            });

            if (findDuplicate) {
              alreadyExits++;
              return { success: true, data: findDuplicate };
            }

            await trx.attendances.create({
              data: {
                attendancedate: currentDate,
                enrollment: {
                  connect: {
                    enrollment_id: enrollment.enrollment_id,
                  },
                },
                status: {
                  connect: {
                    statusslug: preDefined.attendenceStatuses.default,
                  },
                },
                createdby: {
                  connect: {
                    username: "ahmedhabib",
                  },
                },
              },
              select: {
                attendanceid: true,
                attendancedate: true,
                enrollment: {
                  select: {
                    enrollment_id: true,
                    student: {
                      select: {
                        studentid: true,
                        stdid: true,
                      },
                    },
                  },
                },
              },
            });

            totalCreated++;
          } catch (err) {
            logger.error(JSON.stringify(err));

            throw new Error(
              err.message || "Something went wrong please contact support team"
            );
          }
        })
      );

      return {
        totalStudents: classByCourse._count.enrollments,
        totalCreated,
        alreadyExits,
        totalErrors,
      };
    });

    return results;
  }

  public async findClassSemesterCoursesAttendances(
    payload: GetClassSemesterCourseAttendancePayload,
    isMiniView: boolean
  ): Promise<IAttendances[]> {
    let { classSlug, courseSlug, semesterSlug, teacherId } = payload;

    try {
      const findClass = await classesDB?.findUnique({
        where: { classslug: classSlug },
        select: { classid: true, classslug: true, classname: true },
      });

      if (!findClass)
        throw new HttpException(409, `This class ${classSlug} not found`);

      let findSemester: { semesterid: number } = await semestersDB?.findUnique({
        where: { semesterslug: semesterSlug || "" },
        select: { semesterid: true },
      });

      if (!findSemester)
        throw new HttpException(409, `semester ${semesterSlug} not found`);

      let findCourse: { courseid: number } = await coursesDB?.findUnique({
        where: { courseslug: courseSlug || "" },
        select: { courseid: true },
      });

      if (!findCourse)
        throw new HttpException(409, `course ${courseSlug} not found`);

      let findTeacher: { teacherid: number } = await teachersDB?.findUnique({
        where: { techid: teacherId || "" },
        select: { teacherid: true },
      });

      if (!findTeacher)
        throw new HttpException(409, `teacher ${teacherId} not found`);

      const enrollments: IEnrollment[] = await enrollmentsDB?.findMany({
        where: {
          courseid: findCourse.courseid,
          classid: findClass.classid,
          teacherid: findTeacher.teacherid,
          semesterid: findSemester.semesterid,
        },
        select: { enrollment_id: true },
      });

      if (enrollments.length <= 0) {
        throw new HttpException(404, `Sorry!, no students found.`);
      }

      const startDate = setStartDay(payload.startDate);
      const endDate = setEndDay(payload.endDate);

      const classSemesterCoursesAttendances: IClassSemesterCourses[] =
        await attendancesDB?.findMany({
          where: {
            enrollmentid: {
              in: enrollments.map((enrollment) => enrollment.enrollment_id),
            },
            AND: [
              { createddate: { gte: startDate ? startDate : undefined } },
              { createddate: { lte: endDate ? endDate : undefined } },
            ],
          },
          select: {
            attendanceid: true,
            attendancedate: true,
            enrollment: {
              select: {
                enrollment_id: true,
                student: {
                  select: {
                    firstname: true,
                    middlename: true,
                    lastname: true,
                    stdid: true,
                  },
                },
                semester_course: !isMiniView
                  ? {
                      select: {
                        course: {
                          select: {
                            coursename: true,
                            courseslug: true,
                          },
                        },
                        teacher: {
                          select: {
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            techid: true,
                          },
                        },
                        class_semester: {
                          select: {
                            class: {
                              select: {
                                classname: true,
                                classslug: true,
                              },
                            },
                            semester: {
                              select: {
                                semestername: true,
                                semesterslug: true,
                              },
                            },
                          },
                        },
                      },
                    }
                  : false,
              },
            },
            status: { select: { statusname: true, statusslug: true } },
            createdby: !isMiniView
              ? {
                  select: {
                    username: !isMiniView,
                    firstname: !isMiniView,
                    middlename: !isMiniView,
                    lastname: !isMiniView,
                  },
                }
              : false,
          },
        });

      return classSemesterCoursesAttendances;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating class, please contact support team.`
      );
    }
  }

  public async updateClassSemesterCoursesAttendance(
    payload: UpdateClassSemesterCourseAttendancePayload
  ): Promise<any> {
    const findUpdatedBy = await usersDB?.findUnique({
      where: {
        username: "ahmedhabib",
      },
      select: {
        userid: true,
      },
    });

    if (!findUpdatedBy) throw new HttpException(409, "User doesn't exist");

    const findAttendance: IAttendances = await attendancesDB?.findUnique({
      where: {
        attendanceid: payload.attendanceId,
      },
      select: {
        attendanceid: true,
      },
    });

    if (!findAttendance)
      throw new HttpException(409, "Attendance doesn't exist");

    const findStatus: IAttendanceStatus =
      await attendancestatusesDB?.findUnique({
        where: {
          statusslug: payload.statusSlug,
        },
        select: {
          statusid: true,
          statusslug: true,
          statusname: true,
        },
      });

    if (!findStatus) throw new HttpException(409, "Status doesn't exist");

    const updateAttendaceData: IAttendances = await attendancesDB?.update({
      where: {
        attendanceid: findAttendance.attendanceid,
      },
      data: {
        status: { connect: { statusid: findStatus.statusid } },
        updatedby: { connect: { userid: findUpdatedBy.userid } },
      },
      select: {
        attendanceid: true,
        attendancedate: true,
        enrollment: {
          select: {
            enrollment_id: true,
            student: {
              select: {
                firstname: true,
                middlename: true,
                lastname: true,
                stdid: true,
              },
            },
          },
        },
        status: { select: { statusname: true, statusslug: true } },
      },
    });

    return updateAttendaceData;
  }
}

export default ClassService;
