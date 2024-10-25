/*
  Warnings:

  - You are about to drop the column `href` on the `posts` table. All the data in the column will be lost.
  - Made the column `post` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "href",
ALTER COLUMN "post" SET NOT NULL;
