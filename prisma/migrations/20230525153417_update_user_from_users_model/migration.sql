/*
  Warnings:

  - You are about to drop the column `name` on the `usersModel` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `usersModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `usersModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usersModel" DROP COLUMN "name",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;
