/*
  Warnings:

  - You are about to drop the column `verficationStatus` on the `technician_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "technician_profiles" DROP COLUMN "verficationStatus",
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING';
