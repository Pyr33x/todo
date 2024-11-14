import { Input, Skeleton } from "~/components/ui";
import { redirect } from "next/navigation";
import { db, todos } from "~/server/db";
import { sql } from "drizzle-orm";
import { Suspense } from "react";

async function toggleCompleted(id: number, completed: boolean) {
  await db
    .update(todos)
    .set({ completed: !completed })
    .where(sql`${todos.id} = ${id}`);
}

async function AllTodos({ searchParams }: { searchParams?: { asc: string } }) {
  const nts = await db
    .select()
    .from(todos)
    .limit(10)
    .orderBy(searchParams?.asc ? sql`${todos.id} ASC` : sql`${todos.id} DESC`);
  return (
    <div className="flex flex-col">
      {nts.map((note) => (
        <div key={note.id} className="flex flex-row items-center   gap-x-2">
          <Input
            type="checkbox"
            name="todo"
            checked={note.completed!}
            className={`appearance-none size-4 p-0 rounded bg-rose-500 mt-1 checked:bg-green-500`}
            onChange={async () => {
              "use server";
              toggleCompleted(note.id, note.completed!);
              return redirect("/dashboard");
            }}
          />
          <p className="checked:line-through text-2xl text-foreground/90 select-none">
            {note.todo}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Todos() {
  return (
    <Suspense fallback={<Skeleton className="h-10" />}>
      <AllTodos />
    </Suspense>
  );
}
