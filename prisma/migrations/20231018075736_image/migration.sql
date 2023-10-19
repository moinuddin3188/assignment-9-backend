/*
  Warnings:

  - Added the required column `cover` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "cover" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "image" TEXT NOT NULL;
