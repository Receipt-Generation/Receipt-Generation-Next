/*
  Warnings:

  - A unique constraint covering the columns `[StripeId]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "StripeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_StripeId_key" ON "Organisation"("StripeId");
