-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_id_module_fkey";

-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_id_student_fkey";

-- AlterTable
ALTER TABLE "StudentModule" ALTER COLUMN "id_student" DROP NOT NULL,
ALTER COLUMN "id_module" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_module_fkey" FOREIGN KEY ("id_module") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
