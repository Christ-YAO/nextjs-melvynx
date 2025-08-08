/*
  Warnings:

  - You are about to drop the column `stripeCustomersId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "stripeCustomersId",
ADD COLUMN     "stripeCustomerId" TEXT;
