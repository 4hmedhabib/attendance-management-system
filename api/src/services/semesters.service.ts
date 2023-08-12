import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateSemesterData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IRPCreateSemesterPayload, ISemester } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const semestersDB = prisma.semesters;
const usersDB = prisma.users;

@Service()
class SemesterService {
  public async findAllSemester(isMiniView: boolean): Promise<ISemester[]> {
    const semesters: ISemester[] = await semestersDB?.findMany({
      select: {
        semesterid: true,
        semestername: true,
        semesterslug: true,
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
              },
            }
          : false,
      },
    });

    if (semesters.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return semesters;
  }

  public async findSemesterBySlug(
    semesterSlug: string,
    isMiniView: boolean
  ): Promise<ISemester> {
    try {
      const findSemester: ISemester = await semestersDB?.findUnique({
        where: { semesterslug: semesterSlug },
        select: {
          semesterid: !isMiniView,
          semestername: true,
          semesterslug: true,
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
                },
              }
            : false,
        },
      });

      if (!findSemester) throw new HttpException(409, "Semester doesn't exist");

      return findSemester;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating semester, please contact support team.`
      );
    }
  }

  public async createSemester(
    semesterData: IRPCreateSemesterPayload
  ): Promise<any> {
    let savedData: Prisma.semestersCreateInput;

    const findSemester = await semestersDB?.findUnique({
      where: { semesterslug: semesterData.semesterSlug },
      select: { semesterid: true, semesterslug: true, semestername: true },
    });

    if (findSemester)
      throw new HttpException(
        409,
        `This semester ${semesterData.semesterName} already exists`
      );

    savedData = {
      ...savedData,
      semestername: semesterData.semesterName,
      semesterslug: semesterData.semesterSlug,
      description: semesterData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createSemesterData: ISemester = await semestersDB?.create({
        data: savedData,
        select: {
          semesterid: true,
          semestername: true,
          semesterslug: true,
        },
      });

      return createSemesterData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating semester, please contact support team.`
      );
    }
  }

  public async updateSemester(
    semesterSlug: string,
    semesterData: UpdateSemesterData
  ): Promise<ISemester> {
    let updatedData: Prisma.semestersUpdateInput;

    const findSemester: ISemester = await semestersDB?.findUnique({
      where: {
        semesterslug: semesterSlug,
      },
      select: {
        semesterid: true,
        semesterslug: true,
      },
    });

    if (!findSemester) throw new HttpException(409, "Semester doesn't exist");

    const checkSemester: ISemester = await semestersDB?.findUnique({
      where: {
        semesterslug: semesterData.semesterSlug,
      },
      select: {
        semesterid: true,
        semesterslug: true,
      },
    });

    // check semester slug is duplicate or not
    if (checkSemester && checkSemester.semesterid !== findSemester.semesterid)
      throw new HttpException(
        409,
        "This semester already exists please check it: " +
          semesterData.semesterName
      );

    updatedData = {
      ...updatedData,
      semestername: semesterData.semesterName,
      semesterslug: semesterData.semesterSlug,
      description: semesterData.description || null,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateSemesterData: ISemester = await semestersDB?.update({
      where: {
        semesterid: findSemester.semesterid,
      },
      data: updatedData,
      select: {
        semesterid: true,
        semestername: true,
        semesterslug: true,
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

    return updateSemesterData;
  }

  public async deleteSemester(semesterSlug: string): Promise<ISemester> {
    const findSemester: ISemester = await semestersDB?.findUnique({
      where: {
        semesterslug: semesterSlug,
      },
    });

    if (!findSemester) throw new HttpException(409, "Semester doesn't exist");

    const deleteSemesterData: ISemester = await semestersDB?.delete({
      where: {
        semesterid: findSemester.semesterid,
      },
      select: {
        semesterid: true,
        semestername: true,
        semesterslug: true,
      },
    });

    return deleteSemesterData;
  }
}

export default SemesterService;
