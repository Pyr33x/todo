"use client";

import { usePathname } from "next/navigation";
import { routes } from "~/lib/routes";
import { cn } from "~/lib/cn";
import Link from "next/link";

export function Routes() {
  const path = usePathname();
  return (
    <>
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "text-lg font-medium transform text-white/80 transition-colors duration-75 hover:text-white/60",
            path === route.path && "text-white"
          )}
        >
          {route.title}
        </Link>
      ))}
    </>
  );
}
