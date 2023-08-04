-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_id_student_fkey";

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "id_student" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
