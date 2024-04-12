
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useGetServerSession from "./hooks/useGetServerSession"

export default async function Page() {
  const session =await useGetServerSession()
  return (
    <section key="1" className="flex justify-center items-center min-h-screen">
      <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shorten your links.</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Rebrand, track, and share your short URLs with confidence.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-center">
            {session?.user.name && (
              <div className="flex flex-col space-y-5 justify-center items-center">
              <Link href="/dashboard">
                  <Button>Dashboard</Button>
              </Link>
              <Link href="/api/auth/signout">
                <Button variant={"destructive"} >Logout</Button>  
              </Link>
              </div>
            )}
            {!session?.user.name && (
              <Link href="/api/auth/signin">
                  <Button>Login</Button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </section>
  )
}