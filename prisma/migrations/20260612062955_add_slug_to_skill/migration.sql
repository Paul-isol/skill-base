/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "skill_slug_key" ON "skill"("slug");
