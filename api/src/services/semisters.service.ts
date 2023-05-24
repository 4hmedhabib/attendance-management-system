import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateSemisterData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IRPCreateSemisterPayload, ISemister } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const semistersDB = prisma.semisters;
const usersDB = prisma.users;

@Service()
class SemisterService {
  public async findAllSemister(isMiniView: boolean): Promise<ISemister[]> {
    const semisters: ISemister[] = await semistersDB.findMany({
      select: {
        semisterid: true,
        semistername: true,
        semisterslug: true,
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
                classes: true,
                coureses: true,
              },
            }
          : false,
      },
    });

    if (semisters.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return semisters;
  }

  public async findSemisterBySlug(
    semisterSlug: string,
    isMiniView: boolean
  ): Promise<ISemister> {
    try {
      const findSemister: ISemister = await semistersDB.findUnique({
        where: { semisterslug: semisterSlug },
        select: {
          semisterid: !isMiniView,
          semistername: true,
          semisterslug: true,
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
          _count: !isMiniView
            ? {
                select: {
                  classes: !isMiniView,
                  coureses: !isMiniView,
                },
              }
            : false,
        },
      });

      if (!findSemister) throw new HttpException(409, "Semister doesn't exist");

      return findSemister;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating semister, please contact support team.`
      );
    }
  }

  public async createSemister(
    semisterData: IRPCreateSemisterPayload
  ): Promise<any> {
    let savedData: Prisma.semistersCreateInput;

    const findSemister = await semistersDB.findUnique({
      where: { semisterslug: semisterData.semisterSlug },
      select: { semisterid: true, semisterslug: true, semistername: true },
    });

    if (findSemister)
      throw new HttpException(
        409,
        `This semister ${semisterData.semisterName} already exists`
      );

    savedData = {
      ...savedData,
      semistername: semisterData.semisterName,
      semisterslug: semisterData.semisterSlug,
      description: semisterData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createSemisterData: ISemister = await semistersDB.create({
        data: savedData,
        select: {
          semisterid: true,
          semistername: true,
          semisterslug: true,
        },
      });

      return createSemisterData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating semister, please contact support team.`
      );
    }
  }

  public async updateSemister(
    semisterSlug: string,
    semisterData: UpdateSemisterData
  ): Promise<ISemister> {
    let updatedData: Prisma.semistersUpdateInput;

    const findSemister: ISemister = await semistersDB.findUnique({
      where: {
        semisterslug: semisterSlug,
      },
      select: {
        semisterid: true,
        semisterslug: true,
      },
    });

    if (!findSemister) throw new HttpException(409, "Semister doesn't exist");

    const checkSemister: ISemister = await semistersDB.findUnique({
      where: {
        semisterslug: semisterData.semisterSlug,
      },
      select: {
        semisterid: true,
        semisterslug: true,
      },
    });

    // check semister slug is duplicate or not
    if (checkSemister && checkSemister.semisterid !== findSemister.semisterid)
      throw new HttpException(
        409,
        "This semister already exists please check it: " +
          semisterData.semisterName
      );

    updatedData = {
      ...updatedData,
      semistername: semisterData.semisterName,
      semisterslug: semisterData.semisterSlug,
      description: semisterData.description || null,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateSemisterData: ISemister = await semistersDB.update({
      where: {
        semisterid: findSemister.semisterid,
      },
      data: updatedData,
      select: {
        semisterid: true,
        semistername: true,
        semisterslug: true,
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
        _count: true
          ? {
              select: {
                classes: true,
              },
            }
          : false,
      },
    });

    return updateSemisterData;
  }

  public async deleteSemister(semisterSlug: string): Promise<ISemister> {
    const findSemister: ISemister = await semistersDB.findUnique({
      where: {
        semisterslug: semisterSlug,
      },
    });

    if (!findSemister) throw new HttpException(409, "Semister doesn't exist");

    const deleteSemisterData: ISemister = await semistersDB.delete({
      where: {
        semisterid: findSemister.semisterid,
      },
      select: {
        semisterid: true,
        semistername: true,
        semisterslug: true,
      },
    });

    return deleteSemisterData;
  }
}

export default SemisterService;
