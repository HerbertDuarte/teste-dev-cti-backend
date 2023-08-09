/*
  Warnings:

  - You are about to drop the column `score` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "score";

-- AlterTable
ALTER TABLE "StudentModule" ADD COLUMN     "score" DOUBLE PRECISION[];
