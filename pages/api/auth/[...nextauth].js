import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "nextAuthDb",
  }),
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  callbacks: {
    // consider a situation, if the user doesn't updates his email
    // address in GITHUB profile, we won't have control over
    // any unique field to retrive a specific user through CURD operation
    // but This async function will help us to create a unique field
    // and to store the user id to jwt token while jwt creation and updation
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    // this session async funtion will pass the id mongodb by setting up
    // session user object with the stored id from the jwt token
    async sesssion(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});
