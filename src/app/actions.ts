"use server";

import { db, todos } from "~/server/db";
import { redirect } from "next/navigation";

export async function createTodo(form: FormData) {
  const todo = form.get("todo");
  if (!todo) return;
  // await db.insert(todos).values({ todo });
  redirect("/dashboard");
}
