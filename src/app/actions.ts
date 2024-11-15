"use server";

import { revalidatePath } from "next/cache";
import { db, todos } from "~/server/db";

export async function createTodo(form: FormData, userId: string) {
  const todo = form.get("todo");
  if (!todo || typeof todo !== "string") {
    throw new Error("Todo text is required");
  }

  await db.insert(todos).values({ todo, userId });
  revalidatePath("/dashboard");
}
