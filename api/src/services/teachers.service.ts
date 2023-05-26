import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateTeacherData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IRPCreateTeacherPayload, ITeacher } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const teachersDB = prisma.teachers;

@Service()
class TeacherService {
  public async findAllTeacher(isMiniView: boolean): Promise<ITeacher[]> {
    const teachers: ITeacher[] = await teachersDB.findMany({
      select: {
        teacherid: true,
        techid: true,
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

    if (teachers.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return teachers;
  }

  public async findTeacherBySlug(
    teacherId: string,
    isMiniView: boolean
  ): Promise<ITeacher> {
    try {
      const findTeacher: ITeacher = await teachersDB.findUnique({
        where: { techid: teacherId },
        select: {
          teacherid: true,
          techid: true,
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

      if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");

      return findTeacher;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating teacher, please contact support team.`
      );
    }
  }

  public async createTeacher(
    teacherData: IRPCreateTeacherPayload
  ): Promise<any> {
    let savedData: Prisma.teachersCreateInput;

    const findTeacher = await teachersDB.findUnique({
      where: { techid: teacherData.teacherId },
      select: { teacherid: true, techid: true },
    });

    if (findTeacher)
      throw new HttpException(
        409,
        `This teacher id ${teacherData.teacherId} already exists`
      );

    const findMobileNo = await teachersDB.findUnique({
      where: { techid: teacherData.teacherId },
      select: { teacherid: true, techid: true },
    });

    if (findMobileNo)
      throw new HttpException(
        409,
        `This mobileno ${teacherData.mobileNo} already exists`
      );

    savedData = {
      ...savedData,
      firstname: teacherData.firstName,
      middlename: teacherData.middleName,
      lastname: teacherData.lastName,
      techid: teacherData.teacherId,
      mobileno: teacherData.mobileNo,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createTeacherData: ITeacher = await teachersDB.create({
        data: savedData,
        select: {
          teacherid: true,
          techid: true,
        },
      });

      return createTeacherData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating teacher, please contact support team.`
      );
    }
  }

  public async updateTeacher(
    teacherId: string,
    teacherData: UpdateTeacherData
  ): Promise<ITeacher> {
    let updatedData: Prisma.teachersUpdateInput;

    const findTeacher: ITeacher = await teachersDB.findUnique({
      where: {
        techid: teacherId,
      },
      select: {
        teacherid: true,
        techid: true,
      },
    });

    if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");

    const checkTeacherMobileno: ITeacher = await teachersDB.findUnique({
      where: {
        techid: teacherData.mobileNo,
      },
      select: {
        teacherid: true,
        mobileno: true,
      },
    });

    // check mobileno is duplicate or not
    if (
      checkTeacherMobileno &&
      checkTeacherMobileno.teacherid !== findTeacher.teacherid
    )
      throw new HttpException(
        409,
        "This mobileno already exists please check it: " + teacherData.mobileNo
      );

    const checkTeacherId: ITeacher = await teachersDB.findUnique({
      where: {
        techid: teacherData.mobileNo,
      },
      select: {
        teacherid: true,
        mobileno: true,
      },
    });

    // check email is duplicate or not
    if (checkTeacherId && checkTeacherId.teacherid !== findTeacher.teacherid)
      throw new HttpException(
        409,
        "This teacher id already exists please check it: " +
          teacherData.teacherId
      );

    updatedData = {
      ...updatedData,
      firstname: teacherData.firstName,
      middlename: teacherData.middleName,
      lastname: teacherData.lastName,
      techid: teacherData.teacherId,
      mobileno: teacherData.mobileNo,

      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateTeacherData: ITeacher = await teachersDB.update({
      where: {
        teacherid: findTeacher.teacherid,
      },
      data: updatedData,
      select: {
        teacherid: true,
        techid: true,
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

    return updateTeacherData;
  }

  public async deleteTeacher(teacherId: string): Promise<ITeacher> {
    const findTeacher: ITeacher = await teachersDB.findUnique({
      where: {
        techid: teacherId,
      },
    });

    if (!findTeacher) throw new HttpException(409, "Teacher doesn't exist");

    const deleteTeacherData: ITeacher = await teachersDB.delete({
      where: {
        teacherid: findTeacher.teacherid,
      },
      select: {
        teacherid: true,
        techid: true,
        firstname: true,
        middlename: true,
        lastname: true,
      },
    });

    return deleteTeacherData;
  }
}

export default TeacherService;
