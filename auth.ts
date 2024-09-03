import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, sessions, users } from "./db/schema";

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [GoogleProvider],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
})