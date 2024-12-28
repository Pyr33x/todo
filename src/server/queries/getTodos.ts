"use server";

import { db, todos } from "~/server/db";
import { eq } from "drizzle-orm";

export async function getTodos(id: string) {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, id))
    .orderBy(todos.createdAt);
}
