-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "user_name" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;
