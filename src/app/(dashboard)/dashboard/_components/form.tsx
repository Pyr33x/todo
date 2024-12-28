import { Button, Input } from "~/components/ui";
import { ArrowRight } from "lucide-react";
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
    <Form
      className="flex flex-row space-x-2 z-50 w-full xl:w-[500px] fixed bottom-5 p-5"
      action={handleSubmit}
    >
      <Input
        name="todo"
        id="todo"
        placeholder="Enter todo..."
        maxLength={10}
        disabled={!session}
        className="relative"
      />
      <Button
        disabled={!session}
        type="submit"
        className="right-[24px] top-6 absolute"
        size="sm"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Form>
  );
}
