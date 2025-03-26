import React, { useState } from "react";

type InputBoxProps = {
  onSendMessage: (message: string) => void;
};

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage(""); // Réinitialiser l'input après l'envoi
    }
  };

  return (
    <div className="flex items-center gap-2 border p-2 rounded-lg shadow-md">
      {/* Champ de saisie */}
      <input
        type="text"
        className="flex-1 border p-2 rounded-lg outline-none"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()} // Envoi avec "Entrée"
      />

      {/* Bouton d'envoi */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSend}
      >
        Envoyer
      </button>
    </div>
  );
};

export default InputBox;
