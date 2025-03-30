import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
}

const MessageBar: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      {/* Conteneur des messages */}
      <div className="max-h-60 overflow-y-auto mb-4 border border-gray-300 rounded-lg p-2">
        {messages.map((message) => (
          <div key={message.id} className="p-2 border-b last:border-none">
            {message.text}
          </div>
        ))}
      </div>

      {/* Barre d'entrée avec input + bouton alignés */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 outline-none px-3"
          placeholder="Écrire un message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
