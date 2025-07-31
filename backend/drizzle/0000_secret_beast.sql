CREATE TYPE "public"."sex" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "students" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"firstName" varchar(50),
	"lastName" varchar(50),
	"studentID" varchar(10),
	"birthday" date,
	"sex" "sex",
	CONSTRAINT "students_studentID_unique" UNIQUE("studentID")
);
