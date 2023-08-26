import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { LoginPayloadDto } from "../dtos";
import { HttpException } from "../exceptions/httpException";
import { comparePassword, hashPassword, logger } from "../utils";

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
          console.log(await hashPassword(payload.password));
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
