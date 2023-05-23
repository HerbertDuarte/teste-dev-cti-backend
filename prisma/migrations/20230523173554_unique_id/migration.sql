/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `studentsModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "studentsModel_id_key" ON "studentsModel"("id");
