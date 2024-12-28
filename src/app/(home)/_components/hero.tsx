import { GithubIcon } from "~/components/icons";
import { LayoutDashboard } from "lucide-react";
import { auth, signIn } from "~/server/auth";
import { Button } from "~/components/ui";
import Link from "next/link";

async function handleSignIn() {
  "use server";
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function Hero() {
  const session = await auth();

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground text-center">
        Todo
      </h1>
      <p className="text-xl md:text-2xl text-balance max-w-lg mt-1 font-medium text-muted-foreground text-center">
        A simple todo app with authentication and database.
      </p>
      <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-2">
        <a
          href="https://github.com/pyr33x/todo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            <GithubIcon className="mr-1 h-4 w-4" />
            Star on Github
          </Button>
        </a>
        {session ? (
          <Link href="/dashboard">
            <Button variant="secondary">
              Dashboard
              <LayoutDashboard className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button variant="secondary" onClick={handleSignIn}>
            Sign in with Github
            <GithubIcon className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  );
}
