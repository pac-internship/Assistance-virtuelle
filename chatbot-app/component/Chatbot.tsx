'use client'

import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Message } from '@/types/message'
import MessageList from "./MessageList";
import WelcomeMessage from "./WelcomMessage";
import MessageInput from "./MessageInput";
import { fetchMessages } from '@/lib/fetchMessages'

interface InputBoxProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const InputBox: React.FC<InputBoxProps> = ({ messages, setMessages }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, newUserMessage]);

      // Utilisation de fetch pour récupérer les messages du mock 
      const getBotResponse = async () => {
        try {
          const response = await fetchMessages();
          console.log("Message", response)  // Ici, fetchMessages() peu retourner les données du mock
          const botResponse = response.find((message: Message) =>
            message.text.toLowerCase().includes(inputValue.toLowerCase()) // Chercher une correspondance
          );

          if (botResponse) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                ...botResponse,
                id: prevMessages.length + 1,
                timestamp: new Date().toISOString(),
              }
            ]);
          } else {
            
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                id: prevMessages.length + 1,
                text: "Je n'ai pas compris, pouvez-vous reformuler ?",
                sender: "bot",
                timestamp: new Date().toISOString(),
              }
            ]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données du bot:', error);
        }
      };

      getBotResponse();  // Appeler la fonction pour obtenir la réponse

      setInputValue("");  // Réinitialiser le champ de saisie
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white w-full">
      {messages.length === 1 && messages[0].sender === "bot" ? (
        <WelcomeMessage text={messages[0].text} />
      ) : (
        <MessageList messages={messages} />
      )}
      <MessageInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        textareaRef={textareaRef}
      />
    </div>
  );
};

export default InputBox;
