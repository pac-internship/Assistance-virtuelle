// FAQPage.tsx
"use client";

import React, { useEffect, useState } from "react";


type Question = {
  id: number;
  contenu: string;
  children: Question[];
};

const FAQPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/faq");
      const data = await res.json();
      
      console.log("Questions récupérées :", data);
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <div className="p-6">
     

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-800">{question.contenu}</h3>
            {question.children.length > 0 && (
              <ul className="ml-6 mt-2 list-disc text-gray-600">
                {question.children.map((child) => (
                  <li key={child.id}>{child.contenu}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
