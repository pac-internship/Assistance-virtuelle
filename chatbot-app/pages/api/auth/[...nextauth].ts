// auth.config.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Simuler un utilisateur
        if (credentials.username === "admin" && credentials.password === "Zako_0034") {
          return { id: "1", name: "Admin User", username: "admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",  // La page de connexion personnalisée
    error: "/auth/error",   // La page en cas d'erreur
  },
  session: {
    strategy: "jwt" as const,  // Utilisation du JWT pour la session
  },
  secret: process.env.NEXTAUTH_SECRET,  // La clé secrète
};

export default NextAuth(authOptions);  // Assure-toi d'exporter correctement
