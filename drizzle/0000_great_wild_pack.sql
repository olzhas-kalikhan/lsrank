CREATE TABLE IF NOT EXISTS "lsrank_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "lsrank_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_list_items" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"list_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"score" double precision NOT NULL,
	"meta_id" varchar(255),
	"url" text,
	CONSTRAINT "lsrank_list_items_name_list_id_unique" UNIQUE("name","list_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_lists" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"type" varchar(255) NOT NULL,
	CONSTRAINT "lsrank_lists_user_id_name_unique" UNIQUE("user_id","name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lsrank_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "lsrank_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_account" ADD CONSTRAINT "lsrank_account_user_id_lsrank_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lsrank_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_list_items" ADD CONSTRAINT "lsrank_list_items_list_id_lsrank_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lsrank_lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_lists" ADD CONSTRAINT "lsrank_lists_user_id_lsrank_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lsrank_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lsrank_session" ADD CONSTRAINT "lsrank_session_user_id_lsrank_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lsrank_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "lsrank_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_item_list_id_idx" ON "lsrank_list_items" USING btree ("list_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "list_user_id_idx" ON "lsrank_lists" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "lsrank_session" USING btree ("user_id");