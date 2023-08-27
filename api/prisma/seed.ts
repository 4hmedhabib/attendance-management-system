import { PrismaClient } from "@prisma/client";
import async from "async";
import { attandanceStatuses, users } from "../src/constants";
import { logger } from "../src/utils";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  logger.info("SEEDING STARTED.....");
  async.waterfall(
    [
      (_next: (err: any) => void) => {
        const newData = attandanceStatuses.map((status) => ({
          statusname: status.statusname,
          statusslug: status.statusslug,
        }));

        prisma.attendacestatuses
          .createMany({
            data: newData,
            skipDuplicates: true,
          })
          .then((res) => {
            logger.info("=> SUCCESSFULLY ATTENDANCE STATUSES SEEDED!");
            _next(null);
          })
          .catch((err) => {
            logger.error(err);
            _next(err);
          });

        prisma.groups
          .createMany({
            data: [
              { groupname: "Teachers" },
              { groupname: "Deans" },
              { groupname: "Admin" },
            ].map((group) => ({
              groupname: group.groupname,
              groupslug: slugify(group.groupname?.toLowerCase(), "_"),
            })),
            skipDuplicates: true,
          })
          .then((res) => {
            logger.info("=> SUCCESSFULLY GROUPS SEEDED!");
            _next(null);
          })
          .catch((err) => {
            logger.error(err);
            _next(err);
          });
      }, // groups
      (_next: any) => {
        prisma.users
          .createMany({
            data: users,
            skipDuplicates: true,
          })
          .then((res) => {
            logger.info("=> SUCCESSFULLY USERS SEEDED!");
            _next(null);
          })
          .catch((err) => {
            logger.error(err);
            _next(err);
          });
      }, // users
    ],
    (err, result) => {
      if (err) {
        logger.error("SEEDING ERROR......Ï");
        return;
      }

      logger.info("SEEDING FINISHED.....");
    }
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
