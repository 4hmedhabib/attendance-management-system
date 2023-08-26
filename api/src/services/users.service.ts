import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { GetUsersBySlugFilters, UpdateUserData } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IGroup, IRPCreateUserPayload, IUser } from "../interfaces";
import { hashPassword, logger } from "../utils";

const prisma = new PrismaClient();
const usersDB = prisma.users;
const groupsDB = prisma.groups;

@Service()
class UserService {
  public async findAllUser(
    isMiniView: boolean,
    filters: GetUsersBySlugFilters
  ): Promise<IUser[]> {
    const users: IUser[] = await usersDB?.findMany({
      where: {
        isadmin: filters?.isAdmin || undefined,
      },
      select: {
        userid: true,
        username: true,
        firstname: true,
        middlename: true,
        lastname: true,
        group: { select: { groupname: true, groupslug: true } },
        mobileno: !isMiniView,
        email: !isMiniView,
        ispwdupgraded: !isMiniView,
        isstudent: !isMiniView,
        isteacher: !isMiniView,
        createdat: true,
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

    if (users.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return users;
  }

  public async findUserBySlug(
    username: string,
    isMiniView: boolean
  ): Promise<IUser> {
    try {
      const findUser: IUser = await usersDB?.findUnique({
        where: { username: username },
        select: {
          userid: true,
          username: true,
          firstname: true,
          middlename: true,
          lastname: true,
          isadmin: true,
          isteacher: true,
          mobileno: !isMiniView,
          email: !isMiniView,
          ispwdupgraded: !isMiniView,
          lastaccessdate: !isMiniView,
          lastchangepwd: !isMiniView,
          isstudent: !isMiniView,
          createdat: !isMiniView,
          updatedat: !isMiniView,
          createdusers: !isMiniView
            ? {
                select: {
                  username: !isMiniView,
                  firstname: !isMiniView,
                  middlename: !isMiniView,
                  lastname: !isMiniView,
                },
              }
            : false,
          updatedusers: !isMiniView
            ? {
                select: {
                  username: !isMiniView,
                  firstname: !isMiniView,
                  middlename: !isMiniView,
                  lastname: !isMiniView,
                },
              }
            : false,
          group: { select: { groupname: true, groupslug: true } },
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

      if (!findUser) throw new HttpException(409, "User doesn't exist");

      return findUser;
    } catch (err: any) {
      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        err.message ||
          `Something went wrong creating user, please contact support team.`
      );
    }
  }

  public async createUser(userData: IRPCreateUserPayload): Promise<any> {
    let savedData: Prisma.usersCreateInput;

    const findUser = await usersDB?.findUnique({
      where: { username: userData.username },
      select: { userid: true, username: true },
    });

    if (findUser)
      throw new HttpException(
        409,
        `This user ${userData.username} already exists`
      );

    const findMobileNo = await usersDB?.findUnique({
      where: { username: userData.username },
      select: { userid: true, username: true },
    });

    if (findMobileNo)
      throw new HttpException(
        409,
        `This mobileno ${userData.mobileNo} already exists`
      );

    const findEmail = await usersDB?.findUnique({
      where: { username: userData.username },
      select: { userid: true, username: true },
    });

    if (findEmail)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const findGroup = await groupsDB?.findUnique({
      where: { groupslug: userData.group },
      select: { groupid: true, groupslug: true },
    });

    if (!findGroup)
      throw new HttpException(404, `This group ${userData.group} not found!`);

    if (userData.password !== userData.passwordConfirm)
      throw new HttpException(409, `Passwords do NOT match`);

    if ((await usersDB?.count()) <= 0) {
      savedData = {
        ...savedData,
        firstname: userData.firstName,
        middlename: userData.middleName,
        lastname: userData.lastName,
        username: userData.username,
        mobileno: userData.mobileNo,
        email: userData.email,
        isstudent: userData.isStudent,
        isteacher: userData.isTeacher,
        password: userData.password,
        group: {
          connect: {
            groupid: findGroup.groupid,
          },
        },
      };
    } else {
      savedData = {
        ...savedData,
        firstname: userData.firstName,
        middlename: userData.middleName,
        lastname: userData.lastName,
        username: userData.username,
        mobileno: userData.mobileNo,
        email: userData.email,
        isstudent: userData.isStudent,
        isteacher: userData.isTeacher,
        password: userData.password,
        createdby: {
          connect: {
            username: "ahmedhabib",
          },
        },
        group: {
          connect: {
            groupid: findGroup.groupid,
          },
        },
      };
    }

    try {
      savedData.password = await hashPassword(userData.password);

      const createUserData: IUser = await usersDB?.create({
        data: savedData,
        select: {
          userid: true,
          username: true,
        },
      });

      return createUserData;
    } catch (err: any) {
      console.log(err);

      logger.error(JSON.stringify(err.message) || err);
      throw new HttpException(
        500,
        `Something went wrong creating user, please contact support team.`
      );
    }
  }

  public async updateUser(
    username: string,
    userData: UpdateUserData
  ): Promise<IUser> {
    let updatedData: Prisma.usersUpdateInput;

    const findUser: IUser = await usersDB?.findUnique({
      where: {
        username: username,
      },
      select: {
        userid: true,
        username: true,
      },
    });

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const checkUser: IUser = await usersDB?.findUnique({
      where: {
        username: userData.username,
      },
      select: {
        userid: true,
        username: true,
      },
    });

    // check email is duplicate or not
    if (checkUser && checkUser.userid !== findUser.userid)
      throw new HttpException(
        409,
        "This user already exists please check it: " + userData.username
      );

    const checkUserMobileno: IUser = await usersDB?.findUnique({
      where: {
        username: userData.mobileNo,
      },
      select: {
        userid: true,
        mobileno: true,
      },
    });

    // check mobileno is duplicate or not
    if (checkUserMobileno && checkUserMobileno.userid !== findUser.userid)
      throw new HttpException(
        409,
        "This mobileno already exists please check it: " + userData.mobileNo
      );

    const checkUserEmail: IUser = await usersDB?.findUnique({
      where: {
        username: userData.mobileNo,
      },
      select: {
        userid: true,
        mobileno: true,
      },
    });

    // check email is duplicate or not
    if (checkUserEmail && checkUserEmail.userid !== findUser.userid)
      throw new HttpException(
        409,
        "This email already exists please check it: " + userData.email
      );

    updatedData = {
      ...updatedData,
      firstname: userData.firstName,
      middlename: userData.middleName,
      lastname: userData.lastName,
      username: userData.username,
      mobileno: userData.mobileNo,
      email: userData.email,
      isstudent: userData.isStudent,
      isteacher: userData.isTeacher,
      updatedby: {
        connect: {
          username: "ahmedhabib",
        },
      },
    };

    const updateUserData: IUser = await usersDB?.update({
      where: {
        userid: findUser.userid,
      },
      data: updatedData,
      select: {
        userid: true,
        username: true,
        firstname: true,
        middlename: true,
        lastname: true,
        mobileno: true,
        email: true,
        ispwdupgraded: true,
        lastaccessdate: true,
        lastchangepwd: true,
        isstudent: true,
        isteacher: true,
        createdat: true,
        updatedat: true,
        createdusers: {
          select: {
            username: true,
            firstname: true,
            middlename: true,
            lastname: true,
          },
        },
        updatedusers: {
          select: {
            username: true,
            firstname: true,
            middlename: true,
            lastname: true,
          },
        },
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

    return updateUserData;
  }

  public async deleteUser(username: string): Promise<IUser> {
    const findUser: IUser = await usersDB?.findUnique({
      where: {
        username: username,
      },
    });

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: IUser = await usersDB?.delete({
      where: {
        userid: findUser.userid,
      },
      select: {
        userid: true,
        username: true,
        firstname: true,
        middlename: true,
        lastname: true,
      },
    });

    return deleteUserData;
  }

  public async findAllGroups(isMiniView: boolean): Promise<IGroup[]> {
    const groups: IGroup[] = await groupsDB?.findMany({
      select: {
        groupid: true,
        groupname: true,
        groupslug: true,
        createddate: true,
        updateddate: true,
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
        updatedby: !isMiniView
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

    if (groups.length <= 0) {
      throw new HttpException(404, "No data found!.");
    }

    return groups;
  }
}

export default UserService;
