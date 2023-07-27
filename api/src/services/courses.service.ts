import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { GetCoursesBySlugFilters, UpdateCourseData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { ICourse, IRPCreateCoursePayload } from "../interfaces";
import { logger } from "../utils";

const prisma = new PrismaClient();
const coursesDB = prisma.courses;
const usersDB = prisma.users;

@Service()
class CourseService {
  public async findAllCourse(
    isMiniView: boolean,
    filters: GetCoursesBySlugFilters
  ): Promise<ICourse[]> {
    const courses: ICourse[] = await coursesDB.findMany({
      where: {
        semesters: {
          some: {
            class_semester: {
              class: {
                classslug: filters?.classSlug || undefined,
              },
              semester: {
                semesterslug: filters?.semesterSlug || undefined,
              },
            },
          },
        },
      },
      select: {
        courseid: true,
        coursename: true,
        courseslug: true,
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
              select: { semesters: true },
            }
          : false,
      },
    });

    if (courses.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return courses;
  }

  public async findCourseBySlug(
    courseSlug: string,
    isMiniView: boolean
  ): Promise<ICourse> {
    try {
      const findCourse: ICourse = await coursesDB.findUnique({
        where: { courseslug: courseSlug },
        select: {
          courseid: !isMiniView,
          coursename: true,
          courseslug: true,
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
                select: { semesters: true },
              }
            : false,
        },
      });

      if (!findCourse) throw new HttpException(409, "Course doesn't exist");

      return findCourse;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating course, please contact support team.`
      );
    }
  }

  public async createCourse(courseData: IRPCreateCoursePayload): Promise<any> {
    let savedData: Prisma.coursesCreateInput;

    const findCourse = await coursesDB.findUnique({
      where: { courseslug: courseData.courseSlug },
      select: { courseid: true, courseslug: true, coursename: true },
    });

    if (findCourse)
      throw new HttpException(
        409,
        `This course ${courseData.courseName} already exists`
      );

    savedData = {
      ...savedData,
      coursename: courseData.courseName,
      courseslug: courseData.courseSlug,
      description: courseData.description || null,
      createdby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    try {
      const createCourseData: ICourse = await coursesDB.create({
        data: savedData,
        select: {
          courseid: true,
          coursename: true,
          courseslug: true,
        },
      });

      return createCourseData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating course, please contact support team.`
      );
    }
  }

  public async updateCourse(
    courseSlug: string,
    courseData: UpdateCourseData
  ): Promise<ICourse> {
    let updatedData: Prisma.coursesUpdateInput;

    const findCourse: ICourse = await coursesDB.findUnique({
      where: {
        courseslug: courseSlug,
      },
      select: {
        courseid: true,
        courseslug: true,
      },
    });

    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    const checkCourse: ICourse = await coursesDB.findUnique({
      where: {
        courseslug: courseData.courseSlug,
      },
      select: {
        courseid: true,
        courseslug: true,
      },
    });

    // check course slug is duplicate or not
    if (checkCourse && checkCourse.courseid !== findCourse.courseid)
      throw new HttpException(
        409,
        "This course already exists please check it: " + courseData.courseName
      );

    updatedData = {
      ...updatedData,
      coursename: courseData.courseName,
      courseslug: courseData.courseSlug,
      description: courseData.description || null,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateCourseData: ICourse = await coursesDB.update({
      where: {
        courseid: findCourse.courseid,
      },
      data: updatedData,
      select: {
        courseid: true,
        coursename: true,
        courseslug: true,
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
      },
    });

    return updateCourseData;
  }

  public async deleteCourse(courseSlug: string): Promise<ICourse> {
    const findCourse: ICourse = await coursesDB.findUnique({
      where: {
        courseslug: courseSlug,
      },
    });

    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    const deleteCourseData: ICourse = await coursesDB.delete({
      where: {
        courseid: findCourse.courseid,
      },
      select: {
        courseid: true,
        coursename: true,
        courseslug: true,
      },
    });

    return deleteCourseData;
  }
}

export default CourseService;
