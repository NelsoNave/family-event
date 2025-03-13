/*
  Warnings:

  - You are about to drop the column `is_sent` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `is_email_sent` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "is_sent",
ADD COLUMN     "is_email_sent" BOOLEAN NOT NULL;
