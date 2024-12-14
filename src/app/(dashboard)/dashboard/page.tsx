import { Session } from "~/app/(dashboard)/dashboard/_components/session";
import { TodoForm } from "~/app/(dashboard)/dashboard/_components/form";
import { Todos } from "~/app/(dashboard)/dashboard/_components/todo";
import { GithubIcon } from "~/components/icons";
import { CornerDownLeft } from "lucide-react";
import { auth, signIn } from "~/server/auth";
import { Button } from "~/components/ui";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  description:
    "Add, remove and edit your todos. You have full access to your todos.",
};

export default async function Dashboard() {
  const session = await auth();
  if (!session)
    return (
      <div className="max-w-4xl px-4 lg:px-0">
        <h1 className="text-center text-3xl font-black tracking-tight text-foreground md:text-5xl">
          Restricted
        </h1>
        <p className="mt-2 max-w-sm md:max-w-2xl text-wrap text-center text-lg font-medium tracking-tight text-foreground/60 lg:text-xl">
          You must sign in to your github account to access the dashboard.
        </p>
        <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-x-2">
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button
              variant="home"
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground/90 group"
            >
              <GithubIcon className="mr-2 h-4 w-4 fill-white" />
              Continue with Github
            </Button>
          </form>
          <Link href="/">
            <Button variant="home">
              Return Home
              <CornerDownLeft className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  return (
    <section className="max-w-4xl px-4 lg:px-0">
      <div className="flex flex-col items-center justify-center w-full">
        <Session />
        <hr className="w-full rounded-full border-t border-t-neutral-800 my-6" />
        <TodoForm />
        <div className="mt-5 w-full">
          <Todos />
        </div>
      </div>
    </section>
  );
}
