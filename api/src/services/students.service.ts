import { Prisma, PrismaClient } from "@prisma/client";
import async from "async";
import { Service } from "typedi";
import {
  BulkStudentDataPayload,
  CreateEnrollmentPayload,
  CreateStudentPayload,
  EnrollmentsPayloadFiltersDto,
  UpdateStudentData,
} from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IEnrollment, IRPCreateStudentPayload, IStudent } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const studentsDB = prisma.students;
const usersDB = prisma.users;
const enrollmentsDB = prisma.enrollments;
const teachersDB = prisma.teachers;
const classesDB = prisma.classes;
const semestersDB = prisma.semesters;
const coursesDB = prisma.courses;
const semester_coursesDB = prisma.semester_courses;

@Service()
class StudentService {
  public async findAllStudent(isMiniView: boolean): Promise<IStudent[]> {
    const students: IStudent[] = await studentsDB.findMany({
      select: {
        studentid: true,
        stdid: true,
        firstname: true,
        middlename: true,
        lastname: true,
        mobileno: !isMiniView,
        createdat: !isMiniView,
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
      },
    });

    if (students.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return students;
  }

  public async findStudentBySlug(
    studentId: string,
    isMiniView: boolean
  ): Promise<IStudent> {
    try {
      const findStudent: IStudent = await studentsDB.findUnique({
        where: { stdid: studentId },
        select: {
          studentid: true,
          stdid: true,
          firstname: true,
          middlename: true,
          lastname: true,
          mobileno: !isMiniView,
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
        },
      });

      if (!findStudent) throw new HttpException(409, "Student doesn't exist");

      return findStudent;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating student, please contact support team.`
      );
    }
  }

  public async createStudent(
    studentData: IRPCreateStudentPayload
  ): Promise<any> {
    let savedData: Prisma.studentsCreateInput;

    const findStudent = await studentsDB.findUnique({
      where: { stdid: studentData.studentId },
      select: { studentid: true, stdid: true },
    });

    if (findStudent)
      throw new HttpException(
        409,
        `This student id ${studentData.studentId} already exists`
      );

    const findMobileNo = await studentsDB.findUnique({
      where: { stdid: studentData.studentId },
      select: { studentid: true, stdid: true },
    });

    if (findMobileNo)
      throw new HttpException(
        409,
        `This mobileno ${studentData.mobileNo} already exists`
      );

    savedData = {
      ...savedData,
      firstname: studentData.firstName,
      middlename: studentData.middleName,
      lastname: studentData.lastName,
      stdid: studentData.studentId,
      mobileno: studentData.mobileNo,
      yearofstudy: studentData.yearOfStudy,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createStudentData: IStudent = await studentsDB.create({
        data: savedData,
        select: {
          studentid: true,
          stdid: true,
        },
      });

      return createStudentData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating student, please contact support team.`
      );
    }
  }

  public async createBulkStudents(
    studentsData: BulkStudentDataPayload
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let createdByUsername = "ahmedhabib";
      const findCreatedBy = await usersDB.findUnique({
        where: { username: createdByUsername },
        select: { userid: true, username: true },
      });

      if (!findCreatedBy) {
        logger.error(`This user ${createdByUsername} not found`);
        return reject(`This user ${createdByUsername} not found`);
      }

      let totalErrors: number = 0;
      let totalRecords: number = studentsData.data.length;
      let errors: string[] = [];

      const prepareStudent = (studentData: CreateStudentPayload, _next: any) =>
        new Promise<Prisma.studentsCreateManyInput>(async (resolve, reject) => {
          let savedData: Prisma.studentsCreateManyInput;

          const findStudent = await studentsDB.findUnique({
            where: { stdid: studentData.studentId },
            select: { studentid: true, stdid: true },
          });

          if (findStudent) {
            logger.error(
              `This student id ${studentData.studentId} already exists: ${studentData.studentId}`
            );
            return reject(
              `This student id ${studentData.studentId} already exists: ${studentData.studentId}`
            );
          }

          const findMobileNo = await studentsDB.findUnique({
            where: { stdid: studentData.studentId },
            select: { studentid: true, stdid: true },
          });

          if (findMobileNo) {
            logger.error(
              `This mobileno ${studentData.mobileNo} already exists: ${studentData.studentId}`
            );
            return reject(
              `This mobileno ${studentData.mobileNo} already exists: ${studentData.studentId}`
            );
          }

          savedData = {
            ...savedData,
            firstname: studentData.firstName,
            middlename: studentData.middleName,
            lastname: studentData.lastName,
            stdid: studentData.studentId,
            mobileno: studentData.mobileNo,
            yearofstudy: studentData.yearOfStudy,
            createdbyid: findCreatedBy.userid,
          };

          resolve(savedData);
        })
          .then((res) => {
            _next(null, res);
          })
          .catch((err) => {
            totalErrors++;
            errors.push(err.message || err);
            logger.error(err.message || err);
            _next(null, null);
          });

      async.map<any, Prisma.studentsCreateManyInput>(
        studentsData.data,
        prepareStudent,
        async (err, result) => {
          if (err) {
            logger.error(`ERROR NAME: ${err.name}`);
            logger.error(`ERROR MESSAGE: ${err.message}`);
            logger.error(`ERROR STACK: ${err.stack}`);
            return reject(err.message);
          } else {
            const savedData = await studentsDB.createMany({
              data: result.filter((res) => res),
              skipDuplicates: true,
            });

            resolve({
              totalErrors,
              totalRecords,
              errors,
              totalSaved: savedData.count,
            });
          }
        }
      );
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(409, err.message || err);
      });
  }

  public async updateStudent(
    studentId: string,
    studentData: UpdateStudentData
  ): Promise<IStudent> {
    let updatedData: Prisma.studentsUpdateInput;

    const findStudent: IStudent = await studentsDB.findUnique({
      where: {
        stdid: studentId,
      },
      select: {
        studentid: true,
        stdid: true,
      },
    });

    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    const checkStudentMobileno: IStudent = await studentsDB.findUnique({
      where: {
        stdid: studentData.mobileNo,
      },
      select: {
        studentid: true,
        mobileno: true,
      },
    });

    // check mobileno is duplicate or not
    if (
      checkStudentMobileno &&
      checkStudentMobileno.studentid !== findStudent.studentid
    )
      throw new HttpException(
        409,
        "This mobileno already exists please check it: " + studentData.mobileNo
      );

    const checkStudentId: IStudent = await studentsDB.findUnique({
      where: {
        stdid: studentData.mobileNo,
      },
      select: {
        studentid: true,
        mobileno: true,
      },
    });

    // check email is duplicate or not
    if (checkStudentId && checkStudentId.studentid !== findStudent.studentid)
      throw new HttpException(
        409,
        "This student id already exists please check it: " +
          studentData.studentId
      );

    updatedData = {
      ...updatedData,
      firstname: studentData.firstName,
      middlename: studentData.middleName,
      lastname: studentData.lastName,
      stdid: studentData.studentId,
      mobileno: studentData.mobileNo,
      yearofstudy: studentData.yearOfStudy,

      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateStudentData: IStudent = await studentsDB.update({
      where: {
        studentid: findStudent.studentid,
      },
      data: updatedData,
      select: {
        studentid: true,
        stdid: true,
        firstname: true,
        middlename: true,
        lastname: true,
        mobileno: true,
        createdat: true,
        updatedat: true,
        createdby: {
          select: {
            username: true,
            firstname: true,
            middlename: true,
            lastname: true,
          },
        },
        updatedby: {
          select: {
            username: true,
            firstname: true,
            middlename: true,
            lastname: true,
          },
        },
      },
    });

    return updateStudentData;
  }

  public async deleteStudent(studentId: string): Promise<IStudent> {
    const findStudent: IStudent = await studentsDB.findUnique({
      where: {
        stdid: studentId,
      },
    });

    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    const deleteStudentData: IStudent = await studentsDB.delete({
      where: {
        studentid: findStudent.studentid,
      },
      select: {
        studentid: true,
        stdid: true,
        firstname: true,
        middlename: true,
        lastname: true,
      },
    });

    return deleteStudentData;
  }

  public async createEnrollment(enrollmentsData: CreateEnrollmentPayload[]) {
    return new Promise(async (resolve, reject) => {
      let createdByUsername = "ahmedhabib";
      const findCreatedBy = await usersDB.findUnique({
        where: { username: createdByUsername },
        select: { userid: true, username: true },
      });

      if (!findCreatedBy) {
        logger.error(`This user ${createdByUsername} not found`);
        return reject(`This user ${createdByUsername} not found`);
      }

      let totalErrors: number = 0;
      let totalAlreadyExits: number = 0;
      let totalRecords: number = enrollmentsData.length;
      let errors: string[] = [];

      const createEnrollment = (
        enrollmentData: CreateEnrollmentPayload,
        _next: any
      ) => {
        return new Promise(async (resolve, reject) => {
          let savedData: Prisma.enrollmentsCreateManyInput;

          const findStudent = await studentsDB.findUnique({
            where: { stdid: enrollmentData.studentId },
            select: { studentid: true, stdid: true },
          });

          if (!findStudent) {
            logger.error(`This student ${enrollmentData.studentId} not found`);

            return reject(`This student ${enrollmentData.studentId} not found`);
          }

          const findClass = await classesDB.findUnique({
            where: { classslug: enrollmentData.classId },
            select: { classid: true, classslug: true },
          });

          if (!findClass) {
            logger.error(`This class ${enrollmentData.classId} not found`);

            return reject(`This class ${enrollmentData.classId} not found`);
          }

          const findSemester = await semestersDB.findUnique({
            where: { semesterslug: enrollmentData.semesterId },
            select: { semesterid: true, semesterslug: true },
          });

          if (!findSemester) {
            logger.error(
              `This semester ${enrollmentData.semesterId} not found`
            );
            return reject(
              `This semester ${enrollmentData.semesterId} not found`
            );
          }

          const findCourse = await coursesDB.findUnique({
            where: { courseslug: enrollmentData.courseId },
            select: { courseid: true, courseslug: true },
          });

          if (!findCourse) {
            logger.error(`This course ${enrollmentData.courseId} not found`);

            return reject(`This course ${enrollmentData.courseId} not found`);
          }

          const findTeacher = await teachersDB.findUnique({
            where: { techid: enrollmentData.teacherId },
            select: { teacherid: true, techid: true },
          });

          if (!findTeacher) {
            logger.error(`This teacher ${enrollmentData.teacherId} not found`);
            return reject(`This teacher ${enrollmentData.teacherId} not found`);
          }

          const findSemesterCourse = await semester_coursesDB.findUnique({
            where: {
              teacherid_courseid_semesterid_classid: {
                teacherid: findTeacher.teacherid,
                courseid: findCourse.courseid,
                semesterid: findSemester.semesterid,
                classid: findClass.classid,
              },
            },
            select: {
              classid: true,
              teacherid: true,
              courseid: true,
              semesterid: true,
            },
          });

          if (!findSemesterCourse) {
            logger.error(
              `This semester course ${enrollmentData.semesterId} ${enrollmentData.courseId} not found`
            );

            return reject(
              `This semester course ${enrollmentData.semesterId} ${enrollmentData.courseId} not found`
            );
          }

          const findEnrollment = await enrollmentsDB.findFirst({
            where: {
              semester_course: findSemesterCourse,
              studentid: findStudent.studentid,
            },
            select: { enrollment_id: true },
          });

          if (findEnrollment) {
            totalAlreadyExits++;

            logger.error(
              `This enrollment id ${enrollmentData.studentId} already exists: ${enrollmentData.studentId}`
            );
            return reject(
              `This enrollment id ${enrollmentData.studentId} already exists: ${enrollmentData.studentId}`
            );
          }

          savedData = {
            ...savedData,
            enrollment_date: new Date(),
            studentid: findStudent.studentid,
            classid: findClass.classid,
            semesterid: findSemester.semesterid,
            courseid: findCourse.courseid,
            teacherid: findTeacher.teacherid,
            createdbyid: findCreatedBy.userid,
          };

          resolve(savedData);
        })
          .then((res) => {
            _next(null, res);
          })
          .catch((err) => {
            totalErrors++;
            errors.push(err.message || err);
            logger.error(err.message || err);
            _next(null, null);
          });
      };

      async.map<any, Prisma.enrollmentsCreateManyInput>(
        enrollmentsData,
        createEnrollment,
        async (err, result) => {
          if (err) {
            logger.error(`ERROR NAME: ${err.name}`);
            logger.error(`ERROR MESSAGE: ${err.message}`);
            logger.error(`ERROR STACK: ${err.stack}`);
            return reject(err.message);
          } else {
            const savedData = await enrollmentsDB.createMany({
              data: result.filter((res) => res),
              skipDuplicates: true,
            });

            resolve({
              totalErrors,
              totalAlreadyExits,
              totalRecords,
              errors,
              totalSaved: savedData.count,
            });
          }
        }
      );
    });
  }

  public async findAllEnrollments(
    isMiniView: boolean,
    filters: EnrollmentsPayloadFiltersDto
  ): Promise<IEnrollment[]> {
    let enrollmentsWhere: Prisma.enrollmentsWhereInput;

    if (filters.studentId.trim().length > 0) {
      enrollmentsWhere = {
        ...enrollmentsWhere,
        student: { stdid: filters.studentId },
      };
    }

    if (filters.courseId) {
      enrollmentsWhere = {
        ...enrollmentsWhere,
        semester_course: {
          ...(enrollmentsWhere.semester_course as any),
          course: { courseslug: filters.courseId },
        },
      };
    }

    if (filters.semesterId) {
      enrollmentsWhere = {
        ...enrollmentsWhere,
        semester_course: {
          class_semester: {
            semester: { semesterslug: filters.semesterId },
          },
        },
      };
    }

    if (filters.classId) {
      enrollmentsWhere = {
        ...enrollmentsWhere,
        semester_course: {
          ...(enrollmentsWhere.semester_course as any),
          class_semester: {
            ...enrollmentsWhere.semester_course.class_semester,
            class: { classslug: filters.classId },
          },
        },
      };
    }

    const enrollments: IEnrollment[] = await enrollmentsDB.findMany({
      where: enrollmentsWhere,
      select: {
        enrollment_id: true,
        enrollment_date: true,
        student: {
          select: {
            studentid: true,
            stdid: true,
            firstname: !isMiniView,
            middlename: !isMiniView,
            lastname: !isMiniView,
          },
        },
        semester_course: {
          select: {
            course: {
              select: {
                courseid: true,
                coursename: true,
                courseslug: true,
              },
            },
            teacher: !isMiniView
              ? {
                  select: {
                    firstname: true,
                    middlename: true,
                    techid: true,
                    teacherid: true,
                  },
                }
              : false,
            class_semester: {
              select: {
                isended: true,
                isgoingon: true,
                class: !isMiniView
                  ? {
                      select: {
                        classname: true,
                        classslug: true,
                      },
                    }
                  : false,
                semester: !isMiniView
                  ? {
                      select: {
                        semestername: true,
                        semesterslug: true,
                      },
                    }
                  : false,
              },
            },
          },
        },
        created_at: !isMiniView,
        updated_at: !isMiniView,
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
      },
    });

    if (enrollments.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return enrollments;
  }

  public async findAllEnrollment(
    isMiniView: boolean,
    enrollmentId: number
  ): Promise<IEnrollment> {
    const enrollment: IEnrollment = await enrollmentsDB.findUnique({
      where: { enrollment_id: enrollmentId },
      select: {
        enrollment_id: true,
        enrollment_date: true,
        student: {
          select: {
            studentid: true,
            stdid: true,
            firstname: !isMiniView,
            middlename: !isMiniView,
            lastname: !isMiniView,
          },
        },
        semester_course: {
          select: {
            course: {
              select: {
                courseid: true,
                coursename: true,
                courseslug: true,
              },
            },
            teacher: !isMiniView
              ? {
                  select: {
                    firstname: true,
                    middlename: true,
                    techid: true,
                    teacherid: true,
                  },
                }
              : false,
            class_semester: {
              select: {
                isended: true,
                isgoingon: true,
                class: !isMiniView
                  ? {
                      select: {
                        classname: true,
                        classslug: true,
                      },
                    }
                  : false,
                semester: !isMiniView
                  ? {
                      select: {
                        semestername: true,
                        semesterslug: true,
                      },
                    }
                  : false,
              },
            },
          },
        },
        created_at: !isMiniView,
        updated_at: !isMiniView,
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
      },
    });

    if (!enrollment) {
      throw new HttpException(404, "No data found!.");
    }

    return enrollment;
  }
}

export default StudentService;
