import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { hashPassword } from "../../utils";

const attandanceStatuses = ["Absent", "Present", "Late", "Excused"].map(
  (status: string) => ({
    statusname: status,
    statusslug: slugify(status.toLowerCase(), "_"),
  })
);

const users = [
  {
    username: "ahmedhabib",
    firstname: "Ahmed",
    middlename: "Habib",
    lastname: "Ahmed",
    mobileno: "252634044833",
    email: "info.ahmed.developer@gmail.com",
    password: "admin1234",
    isteacher: true,
    isstudent: false,
    isadmin: true,
  },
].map(
  async (user): Promise<Prisma.usersCreateManyInput> => ({
    username: user.username,
    firstname: user.firstname,
    middlename: user.middlename,
    lastname: user.lastname,
    mobileno: user.mobileno,
    email: user.email,
    password: await hashPassword(user.password),
    isteacher: user.isteacher,
    isstudent: user.isstudent,
    isadmin: user.isadmin,
  })
);

export { attandanceStatuses, users };
