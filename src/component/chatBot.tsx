import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import MessageList from "./MessageList";
import WelcomeMessage from "./WelcomMessage";
import MessageInput from "./MessageInput";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

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

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Je suis un bot 🤖 !",
          sender: "bot",
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);

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
