-- CreateTable
CREATE TABLE "public"."ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productID" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ProductImage" ADD CONSTRAINT "ProductImage_productID_fkey" FOREIGN KEY ("productID") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
