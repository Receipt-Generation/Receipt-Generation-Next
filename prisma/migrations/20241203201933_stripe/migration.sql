-- CreateTable
CREATE TABLE "Campaigns" (
    "cid" TEXT NOT NULL,
    "oid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "suggestedamount" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "paymentLink" TEXT NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("cid")
);

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Organisation"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;
