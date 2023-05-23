/*
  Warnings:

  - The primary key for the `studentsModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `studentsModel` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "studentsModel" DROP CONSTRAINT "studentsModel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "studentsModel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "studentsmodel_id_seq";
