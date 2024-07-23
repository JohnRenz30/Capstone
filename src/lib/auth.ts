import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

export interface ExtendedUser extends User {
  role?: Role | null;
}

export interface ExtendedJWT extends JWT {
  role?: Role | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "juan@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const user = await db.user.findFirst({
          where: {
            OR: [
              { email: email }, // Search by email
              { studentID: email }, // Search by username
            ],
          },
        });

        if (!user || user.isArchived) {
          // Return null or throw an error to indicate authentication failure
          return null;
        }

        const userPass = user.hashedPass;

        const isValidPass = bcrypt.compareSync(password, userPass);

        if (!isValidPass) {
          return null;
        }
        const { hashedPass, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60,
  },
  callbacks: {
    async session(params: {
      session: Session;
      token: ExtendedJWT;
      user: ExtendedUser;
    }) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
        params.session.user.role = params.token.role;
        params.session.user.id = params.token.sub;
      }

      return params.session;
    },
    async jwt(params: {
      token: ExtendedJWT;
      user?: ExtendedUser | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.email = params.user.email;
        params.token.role = params.user.role;
        params.token.picture = params.user.image;
        params.token.name = params.user.name;
        params.token.sub = params.user.id;
      }
      return params.token;
    },
  },
};
