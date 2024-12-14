"use server";

import { revalidatePath } from "next/cache";
import { db, todos, type NewTodo } from "~/server/db";

export async function createTodo(form: FormData, userId: string) {
  const todo = form.get("todo");
  if (!todo || typeof todo !== "string") {
    throw new Error("Todo text is required");
  }

  const newTodo: NewTodo = {
    todo,
    userId,
    completed: false,
  };

  await db.insert(todos).values(newTodo);
  revalidatePath("/dashboard");
}
