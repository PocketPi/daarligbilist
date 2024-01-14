-- CreateTable
CREATE TABLE "bad_drivers" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "licensplate" CHAR(16) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "bad_drivers_pkey" PRIMARY KEY ("id")
);
