import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "../exceptions/httpException";
import { IFaculty, IRPCreateFacultyPayload } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const facultiesDB = prisma.faculties;
const usersDB = prisma.users;

@Service()
class FacultyService {
  public async findAllFaculty(): Promise<IFaculty[]> {
    const faculties: IFaculty[] = await facultiesDB.findMany({
      select: {
        facultyid: true,
        facultyname: true,
        facultyslug: true,
        description: true,
        createdby: {
          select: {
            username: true,
            firstname: true,
            middlename: true,
            lastname: true,
          },
        },
        _count: {
          select: {
            shifts: true,
          },
        },
      },
    });
    return faculties;
  }

  public async findFacultyBySlug(
    facultySlug: string,
    isMiniView: boolean
  ): Promise<IFaculty> {
    try {
      const findFaculty: IFaculty = await facultiesDB.findUnique({
        where: { facultyslug: facultySlug },
        select: {
          facultyid: !isMiniView,
          facultyname: true,
          facultyslug: true,
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
          manager: !isMiniView
            ? {
                select: {
                  username: !isMiniView,
                  firstname: !isMiniView,
                  middlename: !isMiniView,
                  lastname: !isMiniView,
                },
              }
            : false,
          deputy: !isMiniView
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
                  shifts: !isMiniView,
                },
              }
            : false,
        },
      });

      if (!findFaculty) throw new HttpException(409, "Faculty doesn't exist");

      return findFaculty;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating faculty, please contact support team.`
      );
    }
  }

  public async createFaculty(
    facultyData: IRPCreateFacultyPayload
  ): Promise<any> {
    let savedData: Prisma.facultiesCreateInput;

    const findFaculty = await facultiesDB.findUnique({
      where: { facultyslug: facultyData.facultySlug },
      select: { facultyid: true, facultyslug: true, facultyname: true },
    });

    if (findFaculty)
      throw new HttpException(
        409,
        `This faculty ${facultyData.facultyName} already exists`
      );

    if (facultyData.manager?.length) {
      const findManager = await usersDB.findUnique({
        where: { username: facultyData.manager },
        select: { userid: true, username: true },
      });

      if (!findManager)
        throw new HttpException(
          403,
          `This manager ${facultyData.manager} not exists`
        );

      savedData = {
        ...savedData,
        manager: {
          connect: {
            userid: findManager.userid,
          },
        },
      };
    }

    if (facultyData.deputy?.length) {
      const findDeputy = await usersDB.findUnique({
        where: { username: facultyData.deputy },
        select: { userid: true, username: true },
      });

      if (!findDeputy)
        throw new HttpException(
          403,
          `This deputy manager ${facultyData.deputy} not exists`
        );

      savedData = {
        ...savedData,
        deputy: {
          connect: {
            userid: findDeputy.userid,
          },
        },
      };
    }

    savedData = {
      ...savedData,
      facultyname: facultyData.facultyName,
      facultyslug: facultyData.facultySlug,
      description: facultyData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createFacultyData: IFaculty = await facultiesDB.create({
        data: savedData,
        select: {
          facultyid: true,
          facultyname: true,
          facultyslug: true,
        },
      });

      return createFacultyData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating faculty, please contact support team.`
      );
    }
  }

  public async updateFaculty(userId: number, facultyData: any): Promise<any[]> {
    const findFaculty: any = [].find((user) => user.id === userId);
    if (!findFaculty) throw new HttpException(409, "Faculty doesn't exist");

    const hashedPassword = await hash(facultyData.password, 10);
    const updateFacultyData: any[] = [].map((user: any) => {
      if (user.id === findFaculty.id)
        user = { ...facultyData, id: userId, password: hashedPassword };
      return user;
    });

    return updateFacultyData;
  }

  public async deleteFaculty(userId: number): Promise<any[]> {
    const findFaculty: any = [].find((user) => user.id === userId);
    if (!findFaculty) throw new HttpException(409, "Faculty doesn't exist");

    const deleteFacultyData: any[] = [].filter(
      (user) => user.id !== findFaculty.id
    );
    return deleteFacultyData;
  }
}

export default FacultyService;
