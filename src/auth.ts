import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthConfig = {
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ profile }) {
      // Change this to your username
      // return profile?.login === "surikov-k";
      return true;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
