import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_CLIENT_SECRET",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email!;
        const name = user.name || "Usuario de Google";
        const image = user.image || undefined;
        
        // Sincronizar con Prisma
        let dbUser = await prisma.user.findUnique({ where: { email } });
        
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email,
              name,
              image,
              role: "CLIENT",
              emailVerified: new Date(),
            }
          });
        } else {
          // Actualizar la foto si está vacía
          if (!dbUser.image && image) {
            await prisma.user.update({
              where: { email },
              data: { image }
            });
          }
        }
        
        // Guardar en la misma cookie manual para mantener compatibilidad
        const cookieStore = await cookies();
        cookieStore.set("userId", dbUser.id, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
  }
});

export { handler as GET, handler as POST };
