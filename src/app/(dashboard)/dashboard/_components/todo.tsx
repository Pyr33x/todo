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

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <li className="h-12 my-1 py-10 px-6 lg:py-12 lg:px-8 w-full text-xl transform transition ease-in-out duration-75 hover:bg-neutral-900 border inline-flex items-center justify-start rounded-md border-neutral-900 bg-neutral-900/30">
      {children}
    </li>
  );
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
    <Suspense fallback={<Skeleton className="h-12 w-full" />}>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {nts.map((note) => (
          <Card key={note.id}>
            <Input
              type="checkbox"
              name="todo"
              checked={note.completed!}
              className="appearance-none mr-4 hover:cursor-pointer size-6 p-0 rounded bg-neutral-700 mt-1 checked:bg-orange-500"
              onChange={async () => {
                "use server";
                toggleCompleted(note.id, note.completed!);
                revalidatePath("/dashboard");
              }}
            />
            <div className="flex flex-col">
              <p className="text-xl lg:text-2xl text-foreground font-medium">
                {note.todo}
              </p>
              <time className="text-base text-neutral-400 select-none">
                {note.createdAt?.toLocaleTimeString()}
              </time>
            </div>
          </Card>
        ))}
      </ul>
    </Suspense>
  );
}
