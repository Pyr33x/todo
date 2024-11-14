import { auth, signIn, signOut } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { routes } from "~/lib/routes";
import Link from "next/link";

export async function Navigation() {
  const session = await auth();
  const [home, dashboard] = routes;
  return (
    <header>
      <nav className="w-full h-16 bg-neutral-950/50 border-b border-b-neutral-800 z-50 fixed backdrop-blur-md">
        <div className="flex flex-row h-full items-center px-4 justify-between">
          <span className="text-xl font-bold text-white">Todo</span>
          <div className="flex flex-row gap-2 items-center">
            {home && (
              <Link
                href={home.path}
                className="text-lg font-medium transform text-white/80 transition-colors duration-75 hover:text-white"
              >
                {home.title}
              </Link>
            )}
            {session && dashboard && (
              <Link
                href={dashboard.path}
                className="text-lg font-medium transform text-white/80 transition-colors duration-75 hover:text-white"
              >
                {dashboard.title}
              </Link>
            )}
          </div>
          <div className="flex flex-row space-x-2 items-center">
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button size="sm">Logout</Button>
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
