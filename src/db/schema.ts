import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 40 }).notNull(),
  firstLastName: varchar({ length: 40 }).notNull(),
  secondLastName: varchar({ length: 40 }).notNull(),
  email: varchar({ length: 254 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  mobile: varchar({ length: 20 }).notNull(),
  age: integer().notNull(),
  address: varchar({ length: 254 }).notNull(),
  zipCode: varchar({ length: 10 }).notNull(),
  city: varchar({ length: 100 }).notNull(),
  country: varchar({ length: 100 }).notNull(),
  terms: boolean(),
  newsletter: boolean(),
  createdAt: timestamp({ mode: "string" }).defaultNow(),
  updatedAt: timestamp(),
});

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export const userInsert = createInsertSchema(usersTable);
