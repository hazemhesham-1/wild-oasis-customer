import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth?.user;
        },
        async signIn({ user, account, profile }) {
            if(!user.email) {
                user.email = `${user.name.replace(/-/g, '')}@mail.com`;
            }
            try {
                const existingGuest = await getGuest(user.email);
                if(!existingGuest) {
                    await createGuest({ full_name: user.name, email: user.email });
                }

                return true;
            }
            catch {
                return false;
            }
        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);