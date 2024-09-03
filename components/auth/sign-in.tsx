import { signIn } from "@/auth"
 
export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors" type="submit">Signin with Google</button>
    </form>
  )
} 