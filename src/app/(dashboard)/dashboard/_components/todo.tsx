import { getTodos, setComplete } from "~/server/queries";
import { Input, Skeleton } from "~/components/ui";
import { revalidatePath } from "next/cache";
import type { Todo } from "~/server/db";
import React, { Suspense } from "react";
import { auth } from "~/server/auth";

async function handleCompleted(id: number, completed: boolean) {
  "use server";

  await setComplete(id, completed);
  revalidatePath("/dashboard");
}

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-12 w-full px-2 text-xl flex items-center border rounded-md border-neutral-800">
      {children}
    </div>
  );
}

export async function Todos() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User is not authenticated");

  const todos: Todo[] = await getTodos(userId);

  return (
    <Suspense fallback={<Skeleton className="h-12" />}>
      <div className="grid grid-cols-2 gap-2">
        {todos.map(({ id, todo, completed }) => (
          <Card key={id}>
            <Input
              type="checkbox"
              name="todo"
              checked={completed ?? false}
              className="mr-2 hover:cursor-pointer size-6 p-0 group rounded appearance-none checked:bg-orange-500 checked:text-white bg-neutral-900"
              onChange={handleCompleted.bind(null, id, completed ?? false)}
            />
            <div className="flex flex-row items-center justify-center gap-x-2">
              <p className="text-xl lg:text-2xl group-checked:line-through text-foreground font-medium">
                {todo}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Suspense>
  );
}
