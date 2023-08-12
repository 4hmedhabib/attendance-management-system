import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateShiftData } from "../dtos/shifts.dto";
import { HttpException } from "../exceptions/httpException";
import { IRPCreateShiftPayload, IShift } from "../interfaces";
import { logger } from "../utils";
import { IFaculty } from "./../interfaces/faculties.interface";

const prisma = new PrismaClient();
const shiftsDB = prisma.shifts;
const facultiesDB = prisma.faculties;

@Service()
class ShiftService {
  public async findAllShift(isMiniView: boolean): Promise<IShift[]> {
    const shifts: IShift[] = await shiftsDB?.findMany({
      select: {
        shiftid: true,
        shiftname: true,
        shiftslug: true,
        description: !isMiniView,
        createdat: !isMiniView,
        updatedat: !isMiniView,
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
        _count: {
          select: {
            classes: true,
          },
        },
      },
    });

    if (shifts.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return shifts;
  }

  public async findShiftBySlug(
    shiftSlug: string,
    isMiniView: boolean
  ): Promise<IShift> {
    try {
      const findShift: IShift = await shiftsDB?.findUnique({
        where: { shiftslug: shiftSlug },
        select: {
          shiftid: !isMiniView,
          shiftname: true,
          shiftslug: true,
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

      if (!findShift) throw new HttpException(409, "Shift doesn't exist");

      return findShift;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating shift, please contact support team.`
      );
    }
  }

  public async createShift(shiftData: IRPCreateShiftPayload): Promise<any> {
    let savedData: Prisma.shiftsCreateInput;

    const findShift = await shiftsDB?.findUnique({
      where: { shiftslug: shiftData.shiftSlug },
      select: { shiftid: true, shiftslug: true, shiftname: true },
    });

    if (findShift)
      throw new HttpException(
        409,
        `This shift ${shiftData.shiftName} already exists`
      );

    savedData = {
      ...savedData,
      shiftname: shiftData.shiftName,
      shiftslug: shiftData.shiftSlug,
      description: shiftData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createShiftData: IShift = await shiftsDB?.create({
        data: savedData,
        select: {
          shiftid: true,
          shiftname: true,
          shiftslug: true,
        },
      });

      return createShiftData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating shift, please contact support team.`
      );
    }
  }

  public async updateShift(
    shiftSlug: string,
    shiftData: UpdateShiftData
  ): Promise<IShift> {
    let updatedData: Prisma.shiftsUpdateInput;

    const findShift: IShift = await shiftsDB?.findUnique({
      where: {
        shiftslug: shiftSlug,
      },
      select: {
        shiftid: true,
        shiftslug: true,
      },
    });

    if (!findShift) throw new HttpException(409, "Shift doesn't exist");

    const checkShift: IShift = await shiftsDB?.findUnique({
      where: {
        shiftslug: shiftData.shiftSlug,
      },
      select: {
        shiftid: true,
        shiftslug: true,
      },
    });

    // check shift slug is duplicate or not
    if (checkShift && checkShift.shiftid !== findShift.shiftid)
      throw new HttpException(
        409,
        "This shift already exists please check it: " + shiftData.shiftName
      );

    updatedData = {
      ...updatedData,
      shiftname: shiftData.shiftName,
      shiftslug: shiftData.shiftSlug,
      description: shiftData.description || null,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateShiftData: IShift = await shiftsDB?.update({
      where: {
        shiftid: findShift.shiftid,
      },
      data: updatedData,
      select: {
        shiftid: true,
        shiftname: true,
        shiftslug: true,
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

    return updateShiftData;
  }

  public async deleteShift(shiftSlug: string): Promise<IShift> {
    const findShift: IShift = await shiftsDB?.findUnique({
      where: {
        shiftslug: shiftSlug,
      },
    });

    if (!findShift) throw new HttpException(409, "Shift doesn't exist");

    const deleteShiftData: IShift = await shiftsDB?.delete({
      where: {
        shiftid: findShift.shiftid,
      },
      select: {
        shiftid: true,
        shiftname: true,
        shiftslug: true,
      },
    });

    return deleteShiftData;
  }
}

export default ShiftService;
