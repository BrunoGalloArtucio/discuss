import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { db } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error(
        "Missing env vars: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET"
    );
}

export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // This function will be called whenever we need to
        // check whose session is it. Usually not needed, fixing bug in extauth
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
});
