
🤖 Assistance Virtuelle – Plateforme d'Assistance Intelligente

Bienvenue dans le projet Assistance Virtuelle, une application web intelligente conçue pour assister les employés d'une entreprise à travers un chatbot conversationnel capable de répondre aux questions fréquentes, guider dans les processus internes et gérer les données via une base connectée.

 📦 Stack technique

- Framework Frontend : [Next.js](https://nextjs.org/)
- Authentification : [NextAuth.js](https://next-auth.js.org/)
- Base de données : MySQL (via [Prisma ORM](https://www.prisma.io/))
- Gestion des utilisateurs : Authentification par email et mot de passe (bcrypt)
- Langage : TypeScript / JavaScript
- Hébergement : (à préciser : Vercel, Railway, Render...)

---

 🚀 Fonctionnalités principales

-  Authentification sécurisée (NextAuth + Prisma Adapter)
-  Chatbot connecté avec logique métier (API/LLM à venir)
-  Base de connaissances consultable et mise à jour
-  Gestion des utilisateurs (inscription, connexion, sessions JWT)
-  Interface responsive et accessible
-  Hashage des mots de passe via bcrypt
-  Architecture modulaire et maintenable


🔧 Installation locale

1. Cloner le dépôt :
bash
git clone https://github.com/ton-org/Assistance-virtuelle.git
cd Assistance-virtuelle


2. Installer les dépendances :


npm install


3. Configurer les variables d’environnement :
   Créer un fichier .env à la racine du projet avec :

.env
DATABASE_URL=mysql://user:password@localhost:3306/assistant-virtuel
NEXTAUTH_SECRET=une_chaine_secrete_complexe qui ce génère avec cette commande: " npx auth secret "
NEXTAUTH_URL=http://localhost:3000

4. Initialiser la base de données :


npx prisma migrate dev --name init


5. Lancer le projet :

npm run dev

🔐 Authentification (NextAuth)

* Type : stratégie `credentials` (email + mot de passe)
* Hashage avec bcrypt
* Sessions JWT
* Pages personnalisées (`/auth/login`, `/auth/error`)


🗃 Exemple de modèle utilisateur (Prisma)

prisma
model User {
  id             String   @id @default(cuid())
  name           String?
  email          String   @unique
  password       String
  emailVerified  DateTime?
  image          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

✨ À venir

* [ ] Connexion à une IA (OpenAI ou LLM local)
* [ ] Interface admin pour alimenter la base de données
* [ ] Notifications (toast + e-mail)
* [ ] Déploiement cloud (Railway / Vercel / PlanetScale)

 🧪 Tests

> En cours de mise en place – bientôt disponibles via Jest ou Vitest.


 🤝 Contribution

Les PR sont les bienvenues 
Si vous souhaitez contribuer :

1. Forkez le projet
2. Créez une branche `feature/ma-fonctionnalite`
3. Proposez une pull request


 📄 Licence

Ce projet est sous licence MIT – libre de l'utiliser, modifier et redistribuer.



📫 Contact













This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
