import { Button, Input } from "~/components/ui";
import { createTodo } from "~/app/actions";
import { auth } from "~/server/auth";
import Form from "next/form";

export async function TodoForm() {
  const session = await auth();
  async function handleSubmit(form: FormData) {
    "use server";
    const userId = session?.user?.id;
    if (!userId) throw new Error("User is not authenticated");
    await createTodo(form, userId);
  }
  return (
    <Form className="flex flex-row space-x-2 w-full" action={handleSubmit}>
      <Input
        name="todo"
        id="todo"
        placeholder="Enter todo..."
        maxLength={10}
        disabled={!session}
      />
      <Button disabled={!session} type="submit">
        📧
      </Button>
    </Form>
  );
}
