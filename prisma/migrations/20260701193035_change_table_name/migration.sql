/*
  Warnings:

  - You are about to drop the `BeautyApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BeautyApplication";

-- CreateTable
CREATE TABLE "BeautyII" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(6) NOT NULL,
    "jobName" VARCHAR(255) NOT NULL,
    "nomination" VARCHAR(50) NOT NULL,
    "authorSurname" VARCHAR(100) NOT NULL,
    "authorName" VARCHAR(100) NOT NULL,
    "authorFathername" VARCHAR(100) NOT NULL,
    "authorOld" INTEGER NOT NULL,
    "representativeSurname" VARCHAR(100) NOT NULL,
    "representativeName" VARCHAR(100) NOT NULL,
    "representativeFathername" VARCHAR(100) NOT NULL,
    "representativePhone" VARCHAR(30) NOT NULL,
    "teacherSurname" VARCHAR(100) NOT NULL,
    "teacherName" VARCHAR(100) NOT NULL,
    "teacherFathername" VARCHAR(100) NOT NULL,
    "teacherPhone" VARCHAR(30) NOT NULL,
    "school" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeautyII_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BeautyII_number_key" ON "BeautyII"("number");
