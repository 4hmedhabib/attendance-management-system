import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { UpdateClassData } from "../dtos/classes.dto";
import { HttpException } from "../exceptions/httpException";
import { IClass, IRPCreateClassPayload, IShift } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const classesDB = prisma.classes;
const shiftsDB = prisma.shifts;

@Service()
class ClassService {
  public async findAllClass(isMiniView: boolean): Promise<IClass[]> {
    const classes: IClass[] = await classesDB.findMany({
      select: {
        classid: true,
        classname: true,
        classslug: true,
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
                semisters: true,
                students: true,
              },
            }
          : false,
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
      const findClass: IClass = await classesDB.findUnique({
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
          _count: !isMiniView
            ? {
                select: {
                  semisters: !isMiniView,
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

    const findClass = await classesDB.findUnique({
      where: { classslug: classData.classSlug },
      select: { classid: true, classslug: true, classname: true },
    });

    if (findClass)
      throw new HttpException(
        409,
        `This class ${classData.className} already exists`
      );

    let shift: IShift = await shiftsDB.findUnique({
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
    };

    try {
      const createClassData: IClass = await classesDB.create({
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

  public async updateClass(
    classSlug: string,
    classData: UpdateClassData
  ): Promise<IClass> {
    let updatedData: Prisma.classesUpdateInput;

    const findClass: IClass = await classesDB.findUnique({
      where: {
        classslug: classSlug,
      },
      select: {
        classid: true,
        classslug: true,
      },
    });

    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const checkClass: IClass = await classesDB.findUnique({
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

    let shift: IShift = await shiftsDB.findUnique({
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
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateClassData: IClass = await classesDB.update({
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
        _count: true
          ? {
              select: {
                semisters: true,
                students: true,
              },
            }
          : false,
      },
    });

    return updateClassData;
  }

  public async deleteClass(classSlug: string): Promise<IClass> {
    const findClass: IClass = await classesDB.findUnique({
      where: {
        classslug: classSlug,
      },
    });

    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const deleteClassData: IClass = await classesDB.delete({
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
}

export default ClassService;
