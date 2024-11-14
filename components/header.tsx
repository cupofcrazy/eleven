import Link from "next/link";
import { SignIn } from "./auth/sign-in";
import { SignOut } from "./auth/sign-out";
import { auth } from "@/auth";
import { UploadForm } from "./upload-form";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { AddNewContent } from "./add-new";

export async function Header() {
  const session = await auth()

  return (
    <header className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-gradient-to-b from-white to-white/0">
      <h1 className="">
        <Link className="text-black/60 hover:text-black" href="/">MARQ</Link>
        <span className=""> / Index</span>
      </h1>
      <div className="flex items-center gap-2">
        {session ? <AddNewContent /> : null}
        {session ? <SignOut /> : <SignIn />}
        {session ? <Link href="/me" className="hover:bg-black/5 rounded-full">
          {session.user?.image ? <Image className="rounded-full" src={session.user.image} alt={session.user.name} width={24} height={24} /> : <UserIcon className="w-5 h-5" />}
        </Link> : null}
      </div>
    </header>
  )
}