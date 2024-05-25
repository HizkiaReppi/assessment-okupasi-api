-- CreateTable
CREATE TABLE "authentication" (
    "token" VARCHAR(300) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "authentication_pkey" PRIMARY KEY ("token")
);
