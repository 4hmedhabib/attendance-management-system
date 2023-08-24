import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  GetUsersBySlugFilters,
  LoginPayloadDto,
  UpdateUserData,
} from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { IAuthLogin, IRPCreateUserPayload, IUser } from "../interfaces";
import { comparePassword, hashPassword, logger } from "../utils";
import { resolve } from "path";
import { reject } from "async";
import { Service } from "typedi";
import { log } from "console";

const prisma = new PrismaClient();
const usersDB = prisma.users;

@Service()
class AuthService {
  public async login(payload: LoginPayloadDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      logger.info(`PAYLOAD DATA: ${JSON.stringify(payload)}`);

      if (payload && payload.username && payload.password) {
        payload.username = payload.username.toLowerCase();

        // get the user
        const user = await usersDB.findFirst({
          where: {
            username: payload.username,
          },
          select: {
            userid: true,
            username: true,
            firstname: true,
            lastname: true,
            middlename: true,
            password: true,
            createdat: true,
            lastchangepwd: true,
            lastaccessdate: true,
            isadmin: true,
            isteacher: true,
            group: {
              select: {
                groupid: true,
                groupname: true,
                groupslug: true,
              },
            },
          },
        });

        if (!user) {
          reject("Username or Password is incorrect");
        }

        try {
          let response: any = {};

          const _comparePassword = await comparePassword(
            payload.password,
            user.password
          );

          if (!_comparePassword) {
            reject("Password is incorrect!");
          }

          response.user = { ...user, password: null };
          response.group = user.group;

          resolve(response);
        } catch (ex) {
          reject(ex.message);
        }
      } else {
        logger.error("Undefined Values: " + JSON.stringify(payload));
        reject("Username or Password is incorrect, please check your input");
      }
    })
      .then((res) => res)
      .catch((err) => {
        logger.error(err);
        throw new HttpException(500, err);
      });
  }
}

export default AuthService;
