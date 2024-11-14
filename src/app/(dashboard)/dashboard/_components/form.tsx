// import { createTodo } from "~/app/actions";
import { Button, Input } from "~/components/ui";
import { redirect } from "next/navigation";
import { db, todos } from "~/server/db";
import Form from "next/form";

export function TodoForm() {
  async function createTodo(form: FormData) {
    "use server";
    const todo = form.get("todo");
    if (!todo) return;
    //@ts-expect-error
    await db.insert(todos).values({ todo });
    return redirect("/dashboard");
  }
  return (
    <Form action={createTodo} className="flex flex-row space-x-2">
      <Input name="todo" id="todo" placeholder="Enter todo..." maxLength={10} />
      <Button type="submit">📧</Button>
    </Form>
  );
}
