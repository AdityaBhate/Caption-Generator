import NextAuth from "next-auth"
import { authProviders } from "../../../../libs/auth"

const handler = NextAuth(authProviders)
export { handler as GET, handler as POST }