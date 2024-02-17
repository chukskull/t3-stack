import { SignInButton, SignOutButton, auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export default async function Home() {
  const { userId } = auth();
  const { data } = await api.post.getAll.query();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        {" "}
        {!userId && <SignInButton />} {!!userId && <SignOutButton />}
      </div>
    </main>
  );
}
