import prisma from "@/lib/prisma";
import { generateRandomCharacters } from "@/lib/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
    link: z.string().min(3),
    shortLink: z.string().optional()
});

export async function POST(req:NextRequest){
    const result = BodySchema.safeParse(await req.json())
    const token = await getToken({req:req})
    if(result.success){
        let shortLink = result.data.shortLink || generateRandomCharacters(6)
        const shortLinkCheck = await prisma.links.findFirst({
            where:{
                shortLink:shortLink
            }
        })
        if(!shortLinkCheck?.shortLink)
        try {
            const response = await prisma.links.create({
                data:{
                    link:result.data.link,
                    shortLink:shortLink,
                    userId: (token as { user: { id: string } }).user.id
                }
            })
            return NextResponse.json(response,{status:200})
        } catch (error) {
            return NextResponse.json({error:error},{status:500})
        }
        else{
            // Tells the user that the short link already exists
            return NextResponse.json("Link Already Exists",{status:400})
        }
    }
    else{
        return NextResponse.json({error:result.error.errors},{status:500})
    }
}



