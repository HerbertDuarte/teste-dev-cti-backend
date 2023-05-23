-- AlterTable
CREATE SEQUENCE studentsmodel_id_seq;
ALTER TABLE "studentsModel" ALTER COLUMN "id" SET DEFAULT nextval('studentsmodel_id_seq');
ALTER SEQUENCE studentsmodel_id_seq OWNED BY "studentsModel"."id";
