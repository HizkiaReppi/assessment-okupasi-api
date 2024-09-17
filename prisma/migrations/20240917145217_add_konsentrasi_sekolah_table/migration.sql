-- CreateTable
CREATE TABLE "konsentrasi_sekolah" (
    "id_sekolah" TEXT NOT NULL,
    "id_konsentrasi" TEXT NOT NULL,

    CONSTRAINT "konsentrasi_sekolah_pkey" PRIMARY KEY ("id_sekolah","id_konsentrasi")
);

-- AddForeignKey
ALTER TABLE "konsentrasi_sekolah" ADD CONSTRAINT "konsentrasi_sekolah_id_sekolah_fkey" FOREIGN KEY ("id_sekolah") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "konsentrasi_sekolah" ADD CONSTRAINT "konsentrasi_sekolah_id_konsentrasi_fkey" FOREIGN KEY ("id_konsentrasi") REFERENCES "konsentrasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
