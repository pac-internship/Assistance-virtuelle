
import React, { useEffect, useState } from "react";
import { format, isToday, isYesterday, subDays, isWithinInterval } from "date-fns";
import fr from "date-fns/locale/fr";
import { useSession } from "next-auth/react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "bot";
//   createdAt: string;
// }
// interface ChatroomType{
//   id: number;
//   titre: string;
// }

// const History =  () => {
//   const [messages, setMessages] = useState<Message[]>([]); // Liste des messages
//   const [title, setTitle] = useState<string>(''); // Titre de la FAQ
//   const [chatrooms, setChatRooms]= useState<ChatroomType[]>([]);

//   useEffect(() => { 
    
//     const fetchHistory = async () => {
//       try {
   
//         const res = await fetch('/api/history');
//         const data = await res.json();

//         if (data.error) {
//           console.error(data.error);
//         } else {
//           setChatRooms(data.chatroom); // Mettre à jour l'état des messages
          
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération de l\'historique', error);
//       }
//     };

//     fetchHistory();
//   }, []); 
//  const handleTitleClick = (titre: string) => {
//     console.log(`Titre cliqué : ${titre}`);
//     setTitle(titre); // Met à jour le titre avec celui de la chatroom cliquée
//   };

//   // Filtrer uniquement les messages de l'utilisateur et effectuer des vérifications supplémentaires
//   const userMessages = messages.filter(
//     (msg, index, arr) =>
//       msg.sender === "user" &&
//       msg.text.length > 3 && // Éviter les messages trop courts
//       (index === 0 || msg.text !== arr[index - 1].text) // Éviter les doublons consécutifs
//   );

//   // Regrouper les messages par date
//   const groupedMessages: { [key: string]: Message[] } = userMessages.reduce((acc, msg) => {
//     if (!msg.createdAt) return acc;

//     const messageDate = new Date(msg.createdAt);
//     let category = format(messageDate, "yyyy-MM-dd");

//     if (isToday(messageDate)) {
//       category = "Aujourd'hui";
//     } else if (isYesterday(messageDate)) {
//       category = "Hier";
//     } else if (isWithinInterval(messageDate, { start: subDays(new Date(), 30), end: new Date() })) {
//       category = "30 derniers jours";
//     } else {
//       category = format(messageDate, "MMMM yyyy", { locale: fr });
//     }

//     if (!acc[category]) acc[category] = [];
//     acc[category].push(msg);

//     return acc;
//   }, {} as { [key: string]: Message[] });

//   return (
//  <div className="p-7 overflow-y-auto" style={{ marginTop: "30px" }}>
//       <h2 className="text-lg font-bold mb-3">{title}</h2> {/* Affiche le titre de la FAQ */}

//       {chatrooms?.map((item) => (
//         <h1
//           key={item.id}
//           onClick={() => handleTitleClick(item.titre)} // Clic pour changer le titre
//           role="button"
//           style={{
//             cursor: "pointer",
//             color: "red",
//             textDecoration: "underline",
//             margin: "5px 0",
//           }}
//           tabIndex={0} // Rendre le titre accessible au clavier
//           onKeyDown={(e) => e.key === "Enter" && handleTitleClick(item.titre)} // Gérer la touche "Entrée"
//           className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           {item.titre}
//         </h1>
//       ))}
//     </div>
//   );
// };




interface Message {
  id: number;
  content: string;
  senderId: "user" | "bot";
  createdAt: string;
}

interface ChatroomType {
  id: number;
  titre: string;
}

const History = ({newChatroom, setMessages}) => {

  const [title, setTitle] = useState<string>("");
  const [chatrooms, setChatRooms] = useState<ChatroomType[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<number | null>(null);
  const { data: session } = useSession(); // Ajout de la session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        setChatRooms(data.chatroom || []); // Protection contre undefined
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique", error);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    setChatRooms(c => [newChatroom, ...c ] )
  }, [newChatroom]);

  // Correction majeure : utilisation de session.user.id au lieu de userId non défini
  const fetchMessages = async (chatroomId: number) => {
    if (!session?.user?.id) {
      console.error("Utilisateur non connecté");
      return;
    }
    else {
      // Correction de l'URL avec les bons paramètres
      const res = await fetch(`/api/history/${chatroomId}`, {
        credentials: 'include', // Important pour les cookies
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log(data);
      console.log(session.user.id);
      
      const formattedMessages = data?.chatroomWithMessage?.message?.map((message :Message) => ({
        id: message.id,
        text: message.content, // ou msg.text selon ton API
        sender: data?.chatroomWithMessage?.idUser === session.user.id ? "user" : "bot",
        createdAt: message.createdAt
      }));
      setMessages(formattedMessages);

    }

  }

  const handleTitleClick = (chatroom: ChatroomType) => {
    setTitle(chatroom.titre);
    setSelectedChatRoom(chatroom.id);
    fetchMessages(chatroom.id);
  };

  return (
    <div className="p-7 overflow-y-auto" style={{ marginTop: "30px" }}>
      <h2 className="text-lg font-bold mb-3">Vos conversations</h2>
      {chatrooms?.map((item) => (
        <h1
          key={item.id}
          onClick={() => handleTitleClick(item)}
          role="button"
          className={`
            cursor-pointer my-1.5 px-3 py-2 rounded-md transition-all
            hover:bg-gray-100 focus:outline-none focus:ring-2
            focus:ring-gray-300 border-none
            ${selectedChatRoom === item.id ? "bg-gray-100 font-medium" : "font-normal"}
          `}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleTitleClick(item)}
        >
          {item.titre}
        </h1>
      ))}

      {/* {selectedChatRoom && messages?.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Messages de : {title}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {messages.map((msg) => (
              <li key={msg.id} className="text-gray-800">
                <strong>{msg.senderId}:</strong> {msg.content}
                <span className="text-xs text-gray-500 block">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default History;