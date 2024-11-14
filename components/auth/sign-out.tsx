import { signOut } from "@/auth";

export async function SignOut() {

  return (
    <form action={async() => {
      "use server"
      await signOut()
    }}>
      <button className="text-neutral-400 hover:text-neutral-700 transition-colors" type="submit">Sign Out</button>
    </form>
  )
}