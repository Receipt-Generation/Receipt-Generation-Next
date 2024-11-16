/*
  Warnings:

  - A unique constraint covering the columns `[receiptNo]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "receiptNo" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_receiptNo_key" ON "Transactions"("receiptNo");
