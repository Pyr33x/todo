import { Input, Skeleton } from "~/components/ui";
import { revalidatePath } from "next/cache";
import { db, todos } from "~/server/db";
import React, { Suspense } from "react";
import { auth } from "~/server/auth";
import { sql } from "drizzle-orm";

async function toggleCompleted(id: number, completed: boolean) {
  await db
    .update(todos)
    .set({ completed: !completed })
    .where(sql`${todos.id} = ${id}`);
}

export async function Todos() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User is not authenticated");

  const nts = await db
    .select()
    .from(todos)
    .where(sql`${todos.userId} = ${userId}`)
    .orderBy(sql`ID DESC`);
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <ul>
        {nts.map((note) => (
          <li
            className="h-24 my-1 px-4 w-full text-xl inline-flex items-center justify-start rounded-md border-neutral-800 bg-neutral-900"
            key={note.id}
          >
            <Input
              type="checkbox"
              name="todo"
              checked={note.completed!}
              className="appearance-none mr-2 hover:cursor-pointer size-12 p-0 rounded bg-rose-500 mt-1 checked:bg-green-500"
              onChange={async () => {
                "use server";
                toggleCompleted(note.id, note.completed!);
                revalidatePath("/dashboard");
              }}
            />
            <div className="flex flex-col">
              <p className="text-2xl text-foreground/90 select-none">
                {note.todo}
              </p>
              <p>{note.createdAt?.toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </Suspense>
  );
}
