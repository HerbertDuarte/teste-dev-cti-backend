/*
  Warnings:

  - The primary key for the `studentsModel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "studentsModel" DROP CONSTRAINT "studentsModel_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "studentsModel_pkey" PRIMARY KEY ("id");
