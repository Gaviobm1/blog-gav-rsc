/*
  Warnings:

  - You are about to drop the column `created_on` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "created_on",
ADD COLUMN     "published" DATE NOT NULL DEFAULT CURRENT_DATE;
