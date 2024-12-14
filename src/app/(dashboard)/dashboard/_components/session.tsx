import { auth } from "~/server/auth";
import Image from "next/image";

export async function Session() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <Image
        src={user?.image ?? ""}
        width="150"
        height="150"
        alt={`${user?.name}'s avatar`}
        className="mb-6 rounded-full select-none transform hover:scale-105 transition-transform active:scale-95 ease-in-out"
        priority
      />
      <h1 className="text-4xl font-bold text-white">{user?.name}</h1>
    </>
  );
}
