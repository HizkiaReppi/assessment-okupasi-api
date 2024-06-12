-- CreateTable
CREATE TABLE "sekolah" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kota" TEXT NOT NULL,

    CONSTRAINT "sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_nama_key" ON "sekolah"("nama");
