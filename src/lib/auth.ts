import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Mock user database - replace with actual database in production
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo1234", // In production, use hashed passwords
    phone: "+1234567890",
    walletBalance: 1000,
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = users.find((user) => user.email === email);

        if (!user || user.password !== password) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          walletBalance: user.walletBalance,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;
        token.walletBalance = user.walletBalance;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.phone = token.phone;
        session.user.walletBalance = token.walletBalance;
      }
      return session;
    },
  },
};