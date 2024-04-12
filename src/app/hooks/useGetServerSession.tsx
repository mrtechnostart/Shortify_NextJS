import { authHandler } from "@/lib/authOptions";
import { sessionType } from "@/lib/types/types";
import { getServerSession } from "next-auth";

export default async function useGetServerSession(){
    const session:sessionType = await getServerSession(authHandler)
    return session
}