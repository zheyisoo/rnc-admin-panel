/*
  Warnings:

  - You are about to drop the column `completed` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ORDERED', 'INPROGRESS', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "completed",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ORDERED';
