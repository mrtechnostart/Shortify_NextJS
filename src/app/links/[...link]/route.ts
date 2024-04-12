import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){
    const res = req.nextUrl.pathname.split('/')
    if(res[2] === undefined || res[2] === ""){
        return NextResponse.json({error:"Link not found"},{status:404})
    }
    const data = await prisma.links.findFirst({
        where:{
            shortLink: res[2]
        }
    })
    if(data?.link)
    return NextResponse.redirect(data.link)
    else
    return NextResponse.json({error:"Link not found"},{status:404})
}