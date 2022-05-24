-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'AGENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Collectivite" (
    "collectId" SERIAL NOT NULL,
    "collectName" VARCHAR(80) NOT NULL,
    "collectTypeId" INTEGER NOT NULL,

    CONSTRAINT "Collectivite_pkey" PRIMARY KEY ("collectId")
);

-- CreateTable
CREATE TABLE "CollectiviteType" (
    "collectTypeId" SERIAL NOT NULL,
    "collectTypeLabel" VARCHAR(20) NOT NULL,

    CONSTRAINT "CollectiviteType_pkey" PRIMARY KEY ("collectTypeId")
);

-- CreateTable
CREATE TABLE "Request" (
    "reqId" TEXT NOT NULL,
    "reqContent" TEXT NOT NULL,
    "reqAttachments" TEXT,
    "reqCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reqUpdatedAt" TIMESTAMP(3) NOT NULL,
    "reqClosedAt" TIMESTAMP(3),
    "reqStatusId" INTEGER NOT NULL,
    "reqTypeId" INTEGER NOT NULL,
    "collectId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("reqId")
);

-- CreateTable
CREATE TABLE "RequestStatus" (
    "reqStatusId" SERIAL NOT NULL,
    "reqStatusLabel" VARCHAR(10) NOT NULL,

    CONSTRAINT "RequestStatus_pkey" PRIMARY KEY ("reqStatusId")
);

-- CreateTable
CREATE TABLE "RequestType" (
    "reqTypeId" SERIAL NOT NULL,
    "reqTypeLabel" VARCHAR(20) NOT NULL,

    CONSTRAINT "RequestType_pkey" PRIMARY KEY ("reqTypeId")
);

-- CreateTable
CREATE TABLE "Response" (
    "resId" TEXT NOT NULL,
    "resSendDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resContent" TEXT NOT NULL,
    "resAttachments" TEXT,
    "userId" TEXT NOT NULL,
    "reqId" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("resId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstname" VARCHAR(80) NOT NULL,
    "lastname" VARCHAR(30) NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "phone" VARCHAR(10),
    "email" VARCHAR(80),
    "password" VARCHAR(80),
    "passMaxAge" INTEGER NOT NULL DEFAULT 0,
    "passChangedAt" TIMESTAMP(3),
    "collectId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Collectivite" ADD CONSTRAINT "Collectivite_collectTypeId_fkey" FOREIGN KEY ("collectTypeId") REFERENCES "CollectiviteType"("collectTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collectivite"("collectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_reqStatusId_fkey" FOREIGN KEY ("reqStatusId") REFERENCES "RequestStatus"("reqStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_reqTypeId_fkey" FOREIGN KEY ("reqTypeId") REFERENCES "RequestType"("reqTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_reqId_fkey" FOREIGN KEY ("reqId") REFERENCES "Request"("reqId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collectivite"("collectId") ON DELETE RESTRICT ON UPDATE CASCADE;
