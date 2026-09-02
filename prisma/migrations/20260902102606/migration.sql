/*
  Warnings:

  - You are about to drop the column `serviceId` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `technicianServiceId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_serviceId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "serviceId",
ADD COLUMN     "technicianServiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_technicianServiceId_fkey" FOREIGN KEY ("technicianServiceId") REFERENCES "technician_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
