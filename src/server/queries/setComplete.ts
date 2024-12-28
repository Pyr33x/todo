"use server";

import { db, todos } from "~/server/db";
import { eq } from "drizzle-orm";

export async function setComplete(id: number, completed: boolean) {
  return await db
    .update(todos)
    .set({ completed: !completed })
    .where(eq(todos.id, id));
}
