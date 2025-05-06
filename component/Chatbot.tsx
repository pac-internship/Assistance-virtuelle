'use client';

import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Message } from '@/types/message';
import MessageList from "./MessageList";
import WelcomeMessage from "./WelcomMessage";
import MessageInput from "./MessageInput";
import FAQPage from '@/component/FAQPage';
import ChatInterface from "./ChatInterface";

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

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      // Affiche le message de l'utilisateur
      setMessages([...messages, newUserMessage]);

      try {
        // Envoie du message au backend
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputValue })
        });

        const data = await res.json(); // récupère la réponse du bot via faker

        const botResponse: Message = {
          id: messages.length + 2,
          text: data.reply || "Sorry, I didn't understand that.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        };

        // Affiche la réponse du bot
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error fetching bot response:", error);

        const errorMessage: Message = {
          id: messages.length + 2,
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setInputValue("");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white w-full">
      {messages.length === 1 && messages[0].sender === "bot" ? (
        <WelcomeMessage text={messages[0].text} />
      ) : (
        <MessageList messages={messages} />
      )}
      <FAQPage />
      <ChatInterface/>
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

