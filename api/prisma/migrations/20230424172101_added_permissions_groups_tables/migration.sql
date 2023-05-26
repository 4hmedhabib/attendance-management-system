-- CreateTable
CREATE TABLE "permissions" (
    "permissionid" SERIAL NOT NULL,
    "permissionslug" TEXT NOT NULL,
    "permissionname" TEXT NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER,
    "updatedbyid" INTEGER,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permissionid")
);

-- CreateTable
CREATE TABLE "groups" (
    "groupid" SERIAL NOT NULL,
    "groupslug" TEXT NOT NULL,
    "groupname" TEXT NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(3) NOT NULL,
    "createdbyid" INTEGER,
    "updatedbyid" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("groupid")
);

-- CreateTable
CREATE TABLE "group_permissions" (
    "permissionid" INTEGER NOT NULL,
    "groupid" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedbyid" INTEGER,

    CONSTRAINT "group_permissions_pkey" PRIMARY KEY ("permissionid","groupid")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permissionslug_key" ON "permissions"("permissionslug");

-- CreateIndex
CREATE UNIQUE INDEX "groups_groupslug_key" ON "groups"("groupslug");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_createdbyid_fkey" FOREIGN KEY ("createdbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_updatedbyid_fkey" FOREIGN KEY ("updatedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_permissions" ADD CONSTRAINT "group_permissions_permissionid_fkey" FOREIGN KEY ("permissionid") REFERENCES "permissions"("permissionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_permissions" ADD CONSTRAINT "group_permissions_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "groups"("groupid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_permissions" ADD CONSTRAINT "group_permissions_assignedbyid_fkey" FOREIGN KEY ("assignedbyid") REFERENCES "users"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
