import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const InputBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };

      setMessages([...messages, newUserMessage]);

      // Simuler une réponse du bot
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Je suis un bot 🤖 !",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);

      setInputValue("");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100">
      {/* Conteneur des messages sans bordure */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg shadow-sm max-w-xs break-words ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Barre d'entrée sans bordure visible */}
      <div className="flex items-center p-2 bg-transparent">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-grow p-3 outline-none text-gray-900 bg-white rounded-full shadow-sm"
          placeholder="Écrire un message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-transparent text-black p-3 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
        >
          <PaperAirplaneIcon className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
