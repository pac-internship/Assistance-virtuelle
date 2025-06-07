// app/faqpage.tsx
"use client";

import React, { useEffect, useState } from "react";

// Type pour une question
type Question = {
  id: number;
  contenu: string;
  children?: Question[]; // Utiliser "?" pour indiquer que c'est optionnel
};

const FAQPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupération des questions via l'API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/faq");
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Données reçues du backend :", JSON.stringify(data, null, 2));

        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error("Le format des données reçues est incorrect.");
        }
      } catch (err) {
        setError((err as Error).message);
        console.error("Erreur lors de la récupération des questions :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Affichage de l'état de chargement ou d'erreur
  if (loading) return <p>Chargement des questions...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div className=" bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <AccordionItem key={question.id} question={question} />
          ))
        ) : (
          <p className="text-gray-600">Aucune question trouvée.</p>
        )}
      </div>
    </div>
  );
};

// Type pour les propriétés de l'élément accordéon
interface AccordionItemProps {
  question: Question;
}

// Composant pour afficher chaque question avec ses enfants
const AccordionItem: React.FC<AccordionItemProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Vérification des enfants pour éviter les erreurs
  const hasChildren = Array.isArray(question.children) && question.children.length > 0;

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{question.contenu}</h3>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            {isOpen ? "masquer" : " réponse"}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-4 pl-4 border-l border-gray-300">
          {question.children?.map((child) => (
            <AccordionItem key={child.id} question={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQPage;
