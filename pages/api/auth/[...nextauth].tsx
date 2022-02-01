// pages/api/auth/[...nextauth].js
import { prisma } from "../../db";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
    secret: process.env.SECRET,
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user)
            {
                token.user=user
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token.user
            return session
        }
    },
    providers: [
    Credentials({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "UserName",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: { label: "Username", type: "text", placeholder: "Poggers" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {

            if (credentials?.username == "" || credentials?.password == "")
                return null

            console.log(credentials)

            const results = await prisma.user.findUnique({
                    where: {
                        name: credentials?.username
                }
            })

            console.log(results)
            // Add logic here to look up the user from the credentials supplied
            var user = (credentials?.password == results?.password) ? results : null

            console.log("AUTH: " + user)

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        }
    })
    ],
})