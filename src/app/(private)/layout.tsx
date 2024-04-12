import { Metadata } from "next";
import { redirect } from "next/navigation";
import useGetServerSession from "@/app/hooks/useGetServerSession";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for Shortify -- Your URL Shortener",
};

export default async function JindalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
    const session = await useGetServerSession()
    if (session?.user?.email)
        return (
    <>
        {children}
    </>
        );
    
    else
        redirect("/api/auth/signin")
    
}
