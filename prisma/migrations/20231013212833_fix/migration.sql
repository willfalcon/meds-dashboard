-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dose" DOUBLE PRECISION NOT NULL,
    "morning" BOOLEAN NOT NULL,
    "night" BOOLEAN NOT NULL,
    "asNeeded" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogNote" (
    "id" SERIAL NOT NULL,
    "logId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "medId" INTEGER NOT NULL,

    CONSTRAINT "LogNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogNote" ADD CONSTRAINT "LogNote_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogNote" ADD CONSTRAINT "LogNote_medId_fkey" FOREIGN KEY ("medId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
