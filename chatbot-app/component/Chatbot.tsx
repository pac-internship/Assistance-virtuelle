'use client';

import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Message } from '@/types/message';
import MessageList from "./MessageList";
import WelcomeMessage from "./WelcomMessage";
import MessageInput from "./MessageInput";

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

      setMessages([...messages, newUserMessage]);

      try {
        // Send the user message to the backend to get a bot reply
        const response = await fetch("/api/chatbot", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputValue }),
        });

        const data = await response.json();

        // Assuming the response from the backend is in the format { reply: "Bot's response" }
        const botResponse: Message = {
          id: messages.length + 2,
          text: data.reply || "Sorry, I didn't understand that.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        };

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
