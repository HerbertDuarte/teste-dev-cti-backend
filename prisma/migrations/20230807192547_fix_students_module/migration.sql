/*
  Warnings:

  - Made the column `id_student` on table `StudentModule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_module` on table `StudentModule` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_id_module_fkey";

-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_id_student_fkey";

-- AlterTable
ALTER TABLE "StudentModule" ALTER COLUMN "id_student" SET NOT NULL,
ALTER COLUMN "id_module" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
