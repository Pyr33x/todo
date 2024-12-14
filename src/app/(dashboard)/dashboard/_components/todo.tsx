import { db, todos, type Todo } from "~/server/db";
import { Input, Skeleton } from "~/components/ui";
import { revalidatePath } from "next/cache";
import React, { Suspense } from "react";
import { auth } from "~/server/auth";
import { eq } from "drizzle-orm";

async function toggleCompleted(id: number, completed: boolean) {
  await db.update(todos).set({ completed: !completed }).where(eq(todos.id, id));
}

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-12 my-1 py-10 px-6 lg:py-12 lg:px-8 w-full text-xl transform transition ease-in-out duration-75 hover:bg-neutral-900 border inline-flex items-center justify-start rounded-md border-neutral-900 bg-neutral-900/30">
      {children}
    </div>
  );
}

export async function Todos() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User is not authenticated");

  const nts: Todo[] = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.createdAt);

  return (
    <Suspense fallback={<Skeleton className="h-11" />}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {nts.map(({ id, todo, completed, createdAt }) => (
          <Card key={id}>
            <Input
              type="checkbox"
              name="todo"
              checked={completed ?? false}
              className="appearance-none mr-4 hover:cursor-pointer size-6 p-0 rounded bg-neutral-700 mt-1 checked:bg-orange-500"
              onChange={async () => {
                "use server";
                toggleCompleted(id, completed ?? false);
                revalidatePath("/dashboard");
              }}
            />
            <div className="flex flex-row items-center justify-center gap-x-2">
              <p className="text-xl lg:text-2xl text-foreground font-medium">
                {todo}
              </p>
              <span>-</span>
              <time className="text-base text-neutral-400 select-none font-medium">
                {createdAt?.toLocaleDateString()}
              </time>
            </div>
          </Card>
        ))}
      </div>
    </Suspense>
  );
}
