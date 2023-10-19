/*
  Warnings:

  - You are about to drop the column `bookingTime` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `problem` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDetail` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingTime",
ADD COLUMN     "faceBookIdLink" TEXT,
ADD COLUMN     "problem" TEXT NOT NULL,
ADD COLUMN     "productDetail" TEXT NOT NULL,
ADD COLUMN     "request" TEXT NOT NULL,
ADD COLUMN     "whatsAppNumber" TEXT;
