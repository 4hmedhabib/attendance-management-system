import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateFacultyData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IFaculty, IRPCreateFacultyPayload } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const facultiesDB = prisma.faculties;
const usersDB = prisma.users;

@Service()
class FacultyService {
  public async findAllFaculty(isMiniView: boolean): Promise<IFaculty[]> {
    const faculties: IFaculty[] = await facultiesDB.findMany({
      select: {
        facultyid: true,
        facultyname: true,
        facultyslug: true,
        description: !isMiniView,
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
        _count: !isMiniView
          ? {
              select: {
                shifts: true,
              },
            }
          : false,
      },
    });

    if (faculties.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

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
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
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

  public async updateFaculty(
    facultySlug: string,
    facultyData: UpdateFacultyData
  ): Promise<IFaculty> {
    let updatedData: Prisma.facultiesUpdateInput;

    const findFaculty: IFaculty = await facultiesDB.findUnique({
      where: {
        facultyslug: facultySlug,
      },
      select: {
        facultyid: true,
        facultyslug: true,
      },
    });

    if (!findFaculty) throw new HttpException(409, "Faculty doesn't exist");

    const checkFaculty: IFaculty = await facultiesDB.findUnique({
      where: {
        facultyslug: facultyData.facultySlug,
      },
      select: {
        facultyid: true,
        facultyslug: true,
      },
    });

    // check faculty slug is duplicate or not
    if (checkFaculty && checkFaculty.facultyid !== findFaculty.facultyid)
      throw new HttpException(
        409,
        "This faculty already exists please check it: " +
          facultyData.facultyName
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

      updatedData = {
        ...updatedData,
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

      updatedData = {
        ...updatedData,
        deputy: {
          connect: {
            userid: findDeputy.userid,
          },
        },
      };
    }

    updatedData = {
      ...updatedData,
      facultyname: facultyData.facultyName,
      description: facultyData.description || null,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateFacultyData: IFaculty = await facultiesDB.update({
      where: {
        facultyid: findFaculty.facultyid,
      },
      data: updatedData,
      select: {
        facultyid: true,
        facultyname: true,
        facultyslug: true,
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
        manager: true
          ? {
              select: {
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
              },
            }
          : false,
        deputy: true
          ? {
              select: {
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
              },
            }
          : false,
        _count: true
          ? {
              select: {
                shifts: true,
              },
            }
          : false,
      },
    });

    return updateFacultyData;
  }

  public async deleteFaculty(facultySlug: string): Promise<IFaculty> {
    const findFaculty: IFaculty = await facultiesDB.findUnique({
      where: {
        facultyslug: facultySlug,
      },
    });

    if (!findFaculty) throw new HttpException(409, "Faculty doesn't exist");

    const deleteFacultyData: IFaculty = await facultiesDB.delete({
      where: {
        facultyid: findFaculty.facultyid,
      },
      select: {
        facultyid: true,
        facultyname: true,
        facultyslug: true,
      },
    });

    return deleteFacultyData;
  }
}

export default FacultyService;
