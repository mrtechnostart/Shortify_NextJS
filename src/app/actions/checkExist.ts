"use server"
import prisma from "@/lib/prisma";

export async function checkLink(link: string): Promise<boolean> {
    const response = await prisma.links.findFirst({
        where:{
            shortLink:link
        }
    })
    console.log(response)
    return response ? true : false
}