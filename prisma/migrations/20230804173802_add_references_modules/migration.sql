/*
  Warnings:

  - You are about to drop the `_AlunoModulos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_aluno` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AlunoModulos" DROP CONSTRAINT "_AlunoModulos_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlunoModulos" DROP CONSTRAINT "_AlunoModulos_B_fkey";

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "id_aluno" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AlunoModulos";

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
