/*
  Warnings:

  - You are about to drop the column `user_id` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `host_id` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_user_id_fkey";

-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "user_id",
ADD COLUMN     "host_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
