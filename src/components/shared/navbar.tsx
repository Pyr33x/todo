import { auth, signIn, signOut } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";
import Link from "next/link";

export async function Navigation() {
  const session = await auth();
  const [_, dashboard] = routes;
  return (
    <header>
      <nav className="w-full h-16 bg-neutral-950/50 border-b border-b-neutral-800 z-50 fixed backdrop-blur-md">
        <div className="flex flex-row h-full items-center px-4 justify-between">
          <Link href="/">
            <span className="text-xl font-bold text-white transform transition-colors hover:text-white/80">
              Todo
            </span>
          </Link>
          <div className="flex flex-row space-x-2 items-center">
            {session && dashboard && (
              <Link
                href={dashboard.path}
                className="text-lg font-medium transform text-white/80 transition-colors duration-75 hover:text-white"
              >
                <Button size="sm">{dashboard.title}</Button>
              </Link>
            )}
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button size="sm" variant="destructive">
                  Logout
                </Button>
              </form>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/dashboard" });
                }}
              >
                <Button type="submit" size="sm">
                  Login
                </Button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
