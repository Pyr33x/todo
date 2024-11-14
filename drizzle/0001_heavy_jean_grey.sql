ALTER TABLE "todos" ADD COLUMN "todo" varchar(10);--> statement-breakpoint
ALTER TABLE "todos" DROP COLUMN IF EXISTS "text";