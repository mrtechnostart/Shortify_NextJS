"use client"

import { useSession } from "next-auth/react"

export default function useGetClientSession(){
    const {data,status} = useSession()
    return {
        data,
        status
    }
}