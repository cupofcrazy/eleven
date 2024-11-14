import { signIn } from "@/actions/auth"
 
export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button className="text-neutral-400 hover:text-neutral-700 transition-colors" type="submit">Log in / Sign up</button>
    </form>
  )
} 