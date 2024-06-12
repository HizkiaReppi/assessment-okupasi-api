-- CreateTable
CREATE TABLE "kompetensi_lulusan" (
    "id_sekolah" TEXT NOT NULL,
    "id_kompetensi_okupasi" TEXT NOT NULL,

    CONSTRAINT "kompetensi_lulusan_pkey" PRIMARY KEY ("id_sekolah","id_kompetensi_okupasi")
);

-- AddForeignKey
ALTER TABLE "kompetensi_lulusan" ADD CONSTRAINT "kompetensi_lulusan_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kompetensi_lulusan" ADD CONSTRAINT "kompetensi_lulusan_id_kompetensi_okupasi_fkey" FOREIGN KEY ("id_kompetensi_okupasi") REFERENCES "kompetensi_okupasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
