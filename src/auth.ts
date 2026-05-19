import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string" ? credentials.username : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedHash = process.env.ADMIN_PASSWORD_HASH;

        if (!expectedUsername || !expectedHash) {
          console.error(
            "Admin credentials not configured: set ADMIN_USERNAME and ADMIN_PASSWORD_HASH in env",
          );
          return null;
        }

        if (username !== expectedUsername) return null;

        const matches = await bcrypt.compare(password, expectedHash);
        if (!matches) return null;

        return { id: "admin", name: expectedUsername };
      },
    }),
  ],
});
