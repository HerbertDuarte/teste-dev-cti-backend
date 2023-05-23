-- CreateTable
CREATE TABLE "StudentsModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "score" JSONB NOT NULL,

    CONSTRAINT "StudentsModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentsModel_cpf_key" ON "StudentsModel"("cpf");
