/*
  Warnings:

  - A unique constraint covering the columns `[sslcommerceTranId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "sslCommerceCustomerId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_sslcommerceTranId_key" ON "payments"("sslcommerceTranId");
