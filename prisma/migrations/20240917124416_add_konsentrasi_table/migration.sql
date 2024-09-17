-- CreateTable
CREATE TABLE "konsentrasi" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(255) NOT NULL,

    CONSTRAINT "konsentrasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "konsentrasi_nama_key" ON "konsentrasi"("nama");
