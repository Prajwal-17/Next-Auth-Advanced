import prisma from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt, { compare } from 'bcryptjs'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client/extension"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "John Cena" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error("Email does not exist. Please create a new account.");
        }

        const isPassword = await compare(credentials.password, user.password as string);

        if (!isPassword) {
          throw new Error("Incorrect password. Please try again.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        }
      }
    }),

  ],
  pages: {
    signIn: "/auth/sign-in"
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider !== "credentials") return true;

      return true;
    },
    jwt: ({ token, user }) => {
      // console.log("token", token)
      // console.log("************************************")
      // console.log("user", user)
      // console.log("*******************end of token*************")
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          email: u.email,
        }
      }
      // if (user) {
      //   return {
      //     ...token,
      //     id: user.id,
      //     email: user.email
      //   }
      // }
      return token
    },
    session: ({ session, token }) => {
      // console.log("***************************")
      // console.log('Session Callback', { session, token })
      // console.log("***************************")
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          // randomKey: token.randomKey
        }
      }
    },

  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }