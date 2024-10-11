ALTER TABLE "lsrank_list_items" DROP CONSTRAINT "lsrank_list_items_name_list_id_unique";--> statement-breakpoint
ALTER TABLE "lsrank_lists" DROP CONSTRAINT "lsrank_lists_user_id_name_unique";--> statement-breakpoint
ALTER TABLE "lsrank_list_items" ADD CONSTRAINT "list_item_name_list_id" UNIQUE("name","list_id");--> statement-breakpoint
ALTER TABLE "lsrank_lists" ADD CONSTRAINT "list_name_user_id" UNIQUE("user_id","name");