-- CreateTable
CREATE TABLE "kompetensi_okupasi" (
    "id" TEXT NOT NULL,
    "kode_okupasi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "kompetensi_okupasi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kompetensi_okupasi" ADD CONSTRAINT "kompetensi_okupasi_kode_okupasi_fkey" FOREIGN KEY ("kode_okupasi") REFERENCES "okupasi"("kode") ON DELETE CASCADE ON UPDATE CASCADE;
