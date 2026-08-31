/*
  Warnings:

  - You are about to drop the column `technicianId` on the `bookings` table. All the data in the column will be lost.
  - The `status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `technicianProfileId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_technicianId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "technicianId",
ADD COLUMN     "cancellationReason" VARCHAR(500),
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledBy" TEXT,
ADD COLUMN     "technicianProfileId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_technicianProfileId_fkey" FOREIGN KEY ("technicianProfileId") REFERENCES "technician_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
