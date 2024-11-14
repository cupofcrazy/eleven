import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/client";
import { accounts, boards,sessions, users, verificationTokens } from "./db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_BOARD_NAME } from "./utils/constants";
import { createBoard } from "./actions/board";

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [GoogleProvider],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    
  }
})