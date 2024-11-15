import { CornerDownLeft, Link } from "lucide-react";
import { GithubIcon } from "~/components/icons";
import { Button } from "~/components/ui";
import { signIn, auth } from "~/server/auth";

export default async function Custom404() {
  const session = await auth();
  return (
    <section className="max-w-4xl px-4 lg:px-0">
      <h1 className="text-center font-black tracking-tight text-foreground text-5xl">
        Not Found
      </h1>
      <p className="mt-2 max-w-sm text-wrap text-center font-medium tracking-tight text-foreground/60 text-xl">
        {"Couldn't find the requested resource."}
      </p>
      <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-x-2">
        {session ? (
          <Button
            disabled
            className="bg-primary disabled:cursor-not-allowed hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground/90"
          >
            <GithubIcon className="mr-2 h-4 w-4 fill-white" />
            {session ? "You already signed in" : "Continue with Github"}
          </Button>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <Button className="bg-primary disabled:cursor-not-allowed hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground/90">
              <GithubIcon className="mr-2 h-4 w-4 fill-white" />
              {session ? "You already signed in" : "Continue with Github"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
