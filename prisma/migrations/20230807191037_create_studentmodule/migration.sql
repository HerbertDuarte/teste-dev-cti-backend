/*
  Warnings:

  - You are about to drop the column `id_student` on the `Module` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_id_student_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "id_student";

-- CreateTable
CREATE TABLE "StudentModule" (
    "id" TEXT NOT NULL,
    "id_student" TEXT,
    "id_module" TEXT,

    CONSTRAINT "StudentModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;
