/*
  Warnings:

  - You are about to drop the column `id_aluno` on the `Module` table. All the data in the column will be lost.
  - Added the required column `id_student` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_id_aluno_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "id_aluno",
ADD COLUMN     "id_student" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
