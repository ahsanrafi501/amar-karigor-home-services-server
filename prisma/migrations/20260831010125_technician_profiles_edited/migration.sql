/*
  Warnings:

  - Made the column `availability` on table `technician_profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nidNumber` on table `technician_profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serviceArea` on table `technician_profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `presentAddress` on table `technician_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "technician_profiles" ALTER COLUMN "availability" SET NOT NULL,
ALTER COLUMN "nidNumber" SET NOT NULL,
ALTER COLUMN "serviceArea" SET NOT NULL,
ALTER COLUMN "presentAddress" SET NOT NULL;
