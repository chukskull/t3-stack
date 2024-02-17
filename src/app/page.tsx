import { SignInButton, SignOutButton, auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        {" "}
        {!userId && <SignInButton />} {!!userId && <SignOutButton />}
      </div>
    </main>
  );
}
