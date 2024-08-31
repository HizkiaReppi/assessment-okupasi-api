-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `is_super` BOOLEAN NOT NULL DEFAULT false,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authentication` (
    `token` VARCHAR(300) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `okupasi` (
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `okupasi_nama_key`(`nama`),
    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kompetensi_okupasi` (
    `id` VARCHAR(191) NOT NULL,
    `kode_okupasi` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sekolah` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kota` VARCHAR(191) NOT NULL,
    `jumlah_siswa` INTEGER NOT NULL,
    `jumlah_kelulusan` INTEGER NOT NULL,

    UNIQUE INDEX `sekolah_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kompetensi_lulusan` (
    `id_sekolah` VARCHAR(191) NOT NULL,
    `id_kompetensi_okupasi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_sekolah`, `id_kompetensi_okupasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kompetensi_okupasi` ADD CONSTRAINT `kompetensi_okupasi_kode_okupasi_fkey` FOREIGN KEY (`kode_okupasi`) REFERENCES `okupasi`(`kode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kompetensi_lulusan` ADD CONSTRAINT `kompetensi_lulusan_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kompetensi_lulusan` ADD CONSTRAINT `kompetensi_lulusan_id_kompetensi_okupasi_fkey` FOREIGN KEY (`id_kompetensi_okupasi`) REFERENCES `kompetensi_okupasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
