/*
  Warnings:

  - Added the required column `kode_unit` to the `kompetensi_okupasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kompetensi_okupasi" ADD COLUMN     "kode_unit" TEXT NOT NULL,
ADD COLUMN     "standard_kompetensi" VARCHAR(250) NOT NULL DEFAULT '';
