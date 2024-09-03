import Image from "next/image";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex flex-col min-h-screen p-4">
      <Image className="rounded-3xl" src={session?.user?.image ?? ""} alt="profile" width={100} height={100} />
      { session?.user ? <SignOut /> : <SignIn /> }
    </main>
  );
}
