import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const authHandler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session:{
        strategy:"jwt"
    },
    callbacks: {
        async jwt({token, user}:any) {
            user && (token.user = user)
            return token
        },
        async session({session, token}:any) {
            session = {
                ...session,
                user: {
                    id: token.user.id,
                    ...session.user
                }
            }
            return session
        }
    }
    
})