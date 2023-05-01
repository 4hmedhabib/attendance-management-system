import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateStudentData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IRPCreateStudentPayload, IStudent } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const studentsDB = prisma.students;

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
}

export default StudentService;
