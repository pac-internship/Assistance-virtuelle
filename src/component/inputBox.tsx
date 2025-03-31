import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const InputBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');

      // Simuler une réponse du bot
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: "Je suis un bot 🤖 ! Comment puis-je vous aider aujourd’hui ?",
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      {/* Conteneur des messages */}
      <div className="max-h-80 overflow-y-auto mb-4 border border-gray-300 rounded-lg p-4 bg-white shadow-md space-y-2 flex flex-col">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg shadow-sm max-w-full break-words whitespace-pre-wrap ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-200 text-gray-900 self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Barre d'entrée */}
      <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-sm bg-white">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-grow p-3 outline-none rounded-full text-gray-900 break-words whitespace-pre-wrap"
          placeholder="Écrire un message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-white text-black p-3 rounded-full hover:bg-gray-200 transition flex items-center justify-center cursor-pointer"
        >
          <PaperAirplaneIcon className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
