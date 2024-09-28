ALTER TABLE "lsrank_list_items" DROP CONSTRAINT "lsrank_list_items_list_id_lsrank_lists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_list_items" ADD CONSTRAINT "lsrank_list_items_list_id_lsrank_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lsrank_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
