/*
  Warnings:

  - You are about to drop the column `description` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `email` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ALTER COLUMN "orgDesc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "description",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
