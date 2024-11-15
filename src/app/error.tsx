"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="max-w-4xl px-4 lg:px-0">
      <h1 className="text-center font-black tracking-tight text-foreground text-5xl">
        Error 500
      </h1>
      <p className="mt-2 max-w-sm text-wrap text-center font-medium tracking-tight text-foreground/60 text-xl">
        An error occurred, maybe refresh?
      </p>
    </section>
  );
}
