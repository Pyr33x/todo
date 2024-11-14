import { Routes } from "~/components/shared/routes";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "~/components/icons";

export function Navigation() {
  return (
    <header>
      <nav className="w-full h-16 bg-neutral-950/50 border-b border-b-neutral-800 z-50 fixed backdrop-blur-md">
        <div className="flex h-full items-center px-4 justify-between">
          <Link href="/">
            <span className="text-xl font-bold text-white">Todo</span>
          </Link>
          <div className="flex flex-row gap-2 items-center">
            <Routes />
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Button size="sm">Login</Button>
            <a
              href="http://github.com/pyr33x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline">
                Github
              </Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
