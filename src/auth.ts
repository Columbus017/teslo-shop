import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "./lib/prisma"
import bcryptjs from 'bcryptjs';

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
 
export const { signIn, signOut, auth, handlers } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log({ auth });
      return !!auth
    },
    async jwt({ token, user }) {
      if ( user ) {
        token.data = user;
      }
      
      return token
    },
    async session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const parseCredentials = z
            .object({ email: z.email(), password: z.string().min(6) })
            .safeParse(credentials);

            // Recibir las contrasenas
            if ( !parseCredentials.success ) return null;
            const { email, password } = parseCredentials.data;
            
            // buscar el usuario por email
            const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }});
            if (!user) return null;

            // comparar las contrasenas
            if ( !bcryptjs.compareSync(password, user.password) ) return null;

            // regresar el usuario
            const { password: _, ...rest } = user;
            
            return rest;

        } catch (error) {
          throw new InvalidLoginError()
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup'
  }
})