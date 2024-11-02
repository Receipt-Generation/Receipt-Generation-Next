-- CreateTable
CREATE TABLE "Organisation" (
    "oid" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgType" TEXT NOT NULL,
    "orgEmail" TEXT NOT NULL,
    "orgPhone" TEXT NOT NULL,
    "orgLogo" TEXT NOT NULL,
    "orgDesc" TEXT NOT NULL,
    "orgUrl" TEXT NOT NULL,
    "orgAddr" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("oid")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "tid" TEXT NOT NULL,
    "oid" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "mailStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("tid")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Organisation"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;
