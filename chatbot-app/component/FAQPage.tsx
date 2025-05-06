// // FAQPage.tsx
// "use client";

// import React, { useEffect, useState } from "react";


// type Question = {
//   id: number;
//   contenu: string;
//   children: Question[];
// };

// const FAQPage = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await fetch("/api/faq");
//       const data = await res.json();
      
//       console.log("Questions récupérées :", data);

//       // console.log("Type :", typeof data);
//       // console.log("Est-ce un tableau ?", Array.isArray(data));
//       setQuestions(data);
//     };

//     fetchQuestions();
//   }, []);

//   return (
//     <div className="p-6">
     

//       <div className="space-y-6">
//       {Array.isArray(questions) && questions.map((question) => (
//   <div key={question.id} className="border-b pb-4">
//     <h3 className="text-lg font-semibold text-gray-800">{question.contenu}</h3>
//     {Array.isArray(question.children) && question.children.length > 0 && (
  //<ul className="mt-4 list-disc list-inside text-gray-600 space-y-2 transition-all duration-200 ease-in-out">
//         {question.children.map((child) => (
//           <li key={child.id}>{child.contenu}</li>
//         ))}
//       </ul>
//     )}
//   </div>
// ))}
//       </div>
//     </div>
//   );
// };

// export default FAQPage;


// src/app/faqpage.tsx  (ou pages/faqpage.tsx selon votre structure)
// src/app/faqpage.tsx (ou pages/faqpage.tsx selon votre structure)
// src/app/faqpage.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { Disclosure } from "@headlessui/react";
// import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

// type Question = {
//   id: number;
//   contenu: string;
//   children: Question[];
// };

// const FAQPage: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);

//   useEffect(() => {
//     async function fetchQuestions() {
//       const res = await fetch("/api/faq");
//       const data: Question[] = await res.json();
//       setQuestions(data);
//     }
//     fetchQuestions();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="text-3xl font-bold text-center mb-10"></h2>
//       <div className="space-y-4">
//         {questions.map(q => (
//           <Disclosure key={q.id}>
//             {({ open }) => (
//               <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//                 <Disclosure.Button className="flex justify-between w-full text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded">
//                   {q.contenu}
//                   {open ? (
//                     <ChevronUpIcon className="w-5 h-5 text-gray-600" />
//                   ) : (
//                     <ChevronDownIcon className="w-5 h-5 text-gray-600" />
//                   )}
//                 </Disclosure.Button>
//                 <Disclosure.Panel className="pt-4 pl-4 pr-2 text-gray-600">
//                   <ul className="list-disc list-inside space-y-2">
//                     {q.children.map(child => (
//                       <li key={child.id}>{child.contenu}</li>
//                     ))}
//                   </ul>
//                 </Disclosure.Panel>
//               </div>
//             )}
//           </Disclosure>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQPage;


// app/faqpage.tsx
"use client";

import React, { useEffect, useState } from "react";

type Question = {
  id: number;
  contenu: string;
  children: Question[];
};

const FAQPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/faq");
        const data: Question[] = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-10">Foire Aux Questions</h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <AccordionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

interface AccordionItemProps {
  question: Question;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = question.children && question.children.length > 0;

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{question.contenu}</h3>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            {isOpen ? "Masquer la réponse" : "Voir la réponse"}
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="mt-4 pl-4 border-l border-gray-300">
          {question.children.map((child) => (
            <AccordionItem key={child.id} question={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQPage;
