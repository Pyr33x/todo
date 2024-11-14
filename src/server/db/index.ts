import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql);

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  todo: varchar("todo", { length: 10 }).notNull(),
  completed: boolean("completed").default(false),
});
