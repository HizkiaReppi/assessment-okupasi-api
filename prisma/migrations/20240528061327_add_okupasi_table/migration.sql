-- CreateTable
CREATE TABLE "okupasi" (
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "okupasi_pkey" PRIMARY KEY ("kode")
);

CREATE UNIQUE INDEX "okupasi_nama_key" ON "okupasi"("nama");
