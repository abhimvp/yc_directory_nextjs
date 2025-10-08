declare module "next-auth" {
  interface Session {
    id: string; // Add the id property to the Session interface
  }
  interface JWT {
    id: string; // Add the id property to the JWT interface
  }
}
