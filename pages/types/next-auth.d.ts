import "next-auth";

declare module "next-auth" {
  interface User {
      id: number,
      avatar: string,
      interests: string
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user?: User
  }
}