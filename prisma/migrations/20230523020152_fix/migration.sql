/*
  Warnings:

  - You are about to drop the `StudentsModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StudentsModel";

-- CreateTable
CREATE TABLE "studentsModel" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "score" JSONB NOT NULL,

    CONSTRAINT "studentsModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentsModel_cpf_key" ON "studentsModel"("cpf");
