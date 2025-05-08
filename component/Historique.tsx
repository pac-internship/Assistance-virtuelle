import React from "react";
import { format, isToday, isYesterday, subDays, isWithinInterval } from "date-fns";
import fr from "date-fns/locale/fr"; 

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
}

interface HistoryProps {
  messages: Message[];
}

const History: React.FC<HistoryProps> = ({ messages }) => {
  // Filtrer uniquement les messages de l'utilisateur
  const userMessages = messages.filter(
    (msg, index, arr) =>
      msg.sender === "user" &&
      msg.text.length > 3 && // Éviter les messages trop courts
      (index === 0 || msg.text !== arr[index - 1].text) // Éviter les doublons consécutifs
  );

  // Regrouper les messages par date
  const groupedMessages: { [key: string]: Message[] } = userMessages.reduce((acc, msg) => {
    if (!msg.timestamp) return acc;

    const messageDate = new Date(msg.timestamp);
    let category = format(messageDate, "yyyy-MM-dd");

    if (isToday(messageDate)) {
      category = "Aujourd'hui";
    } else if (isYesterday(messageDate)) {
      category = "Hier";
    } else if (isWithinInterval(messageDate, { start: subDays(new Date(), 30), end: new Date() })) {
      category = "30 derniers jours";
    } else {
      category = format(messageDate, "MMMM yyyy", { locale: fr });
    }

    if (!acc[category]) acc[category] = [];
    acc[category].push(msg);

    return acc;
  }, {} as { [key: string]: Message[] });

  return (
    <div className=" p-7  overflow-y-auto " style={{marginTop:"30px"}}>

      <h2 className="text-lg font-bold mb-3 fixed  "> </h2>
      {Object.keys(groupedMessages).map((date) => (
        <div key={date} className="mb-4">
          <h3 className="text-sm f text-gray-700 text-xs  font-semibold tracking-wide uppercase">{date}</h3>
          <ul className="mt-2 space-y-2 overflow-y-auto">
            {groupedMessages[date].map((msg) => (
              <li key={msg.id} className="hover:bg-gray-400 cursor-pointer transition-all duration-200 ease-in-out rounded-lg p-2 truncate whitespace-nowrap overflow-hidden text-ellipsis font-sans text-[13px] text-gray-800"
              onClick={() => {
                // Faire défiler la page vers la conversation active
                const chatbox = document.getElementById("chatbox");
                if (chatbox) {
                  chatbox.scrollIntoView({  behavior: "smooth",
                  block: "start", });
                }
              }}
              >
               {msg.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default History;
