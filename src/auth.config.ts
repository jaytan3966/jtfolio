import type { NextAuthConfig } from "next-auth";

export default {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/admin/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin") && !isOnLogin;
      const isOnAdminApi = nextUrl.pathname.startsWith("/api/admin");

      if (isOnAdmin || isOnAdminApi) {
        return isLoggedIn;
      }
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
