'use client';

import { signIn, useSession} from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";




export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

   // Si l'utilisateur est déjà connecté, redirige-le vers la page d'accueil
   useEffect(() => {
    if (session) {
      router.push("/"); // ✅ OK dans useEffect
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Essayer de se connecter avec les informations fournies
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    console.log("Résultat connexion :", res);
    
    if (res?.error) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    } else {
      // Rediriger l'utilisateur après une connexion réussie
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-4 w-96"
      >
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800  p-2 rounded hover:bg-blue-200"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
