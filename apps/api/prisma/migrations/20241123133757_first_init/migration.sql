-- CreateEnum
CREATE TYPE "client_gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "address" VARCHAR(255),
    "gender" "client_gender",
    "hobby" VARCHAR(255),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_UNIQUE" ON "client"("email");
