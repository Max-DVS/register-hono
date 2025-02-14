CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(40) NOT NULL,
	"firstLastName" varchar(40) NOT NULL,
	"secondLastName" varchar(40) NOT NULL,
	"email" varchar(254) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"mobile" varchar(20) NOT NULL,
	"age" integer NOT NULL,
	"address" varchar(254) NOT NULL,
	"zipCode" varchar(10) NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"terms" boolean,
	"newsletter" boolean,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
