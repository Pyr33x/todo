import {
  db,
  users,
  verificationTokens,
  accounts,
  authenticators,
  sessions,
} from "~/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    verificationTokensTable: verificationTokens,
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
  }),
  providers: [GitHub],
  trustHost: true,
});
