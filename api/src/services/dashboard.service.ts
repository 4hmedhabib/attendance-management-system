import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { HttpException } from "../exceptions/httpException";
import { logger } from "../utils";

const prisma = new PrismaClient();
const studentsDB = prisma.students;
const classesDB = prisma.classes;
const coursesDB = prisma.courses;

@Service()
class DashboardService {
  public async dashboard(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let response = { students: 0, courses: 0, classes: 0 };

      response.courses = await coursesDB.count();
      response.students = await studentsDB.count();
      response.classes = await classesDB.count();

      resolve(response);
    })
      .then((res) => res)
      .catch((err) => {
        logger.error(err);
        throw new HttpException(500, err);
      });
  }
}

export default DashboardService;
