import Image from "next/image";
import { auth } from "~/server/auth";

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
        className="mb-6 rounded-full"
        priority
      />
      <h1 className="text-4xl font-bold text-white">{user?.name}</h1>
      <h2 className="text-2xl font-medium text-white">{user?.email}</h2>
    </>
  );
}
