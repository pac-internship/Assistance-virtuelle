// components/Header.tsx

import React from "react";
import Image from "next/image"
import { Bars3Icon } from "@heroicons/react/24/solid";
import Img from "@/component/logo.webp"; // Assure-toi que le chemin d'image est correct
import LogoutButton from "@/component/LogoutButton";
interface HeaderProps {
  onHistoryToggle: () => void;
  onNewChat: () => void;
  showHistory: boolean;
}

const Header: React.FC<HeaderProps> = ({ onHistoryToggle, onNewChat, showHistory }) => {
  return (
    <header className="fixed w-full h-12 bg-white shadow-md flex items-center px-4">
      {/* Icône historique */}
      <button
        onClick={onHistoryToggle}
        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        <Bars3Icon className="w-4 h-4" />
      </button>

      {/* Logo du chatbot */}
      <div className={`flex items-center transition-all duration-300 ${showHistory ? "ml-[8%]" : "ml-5"}`}>
        <div className="h-40 w-40 relative">
  <Image
    src={Img}
    alt="Logo"
    fill
    className="object-contain"
  />
</div>

      </div>

      {/* Bouton New Chat */}
      <div className="flex space-x-2 ml-auto pr-5">
        <button
          onClick={onNewChat}
          className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-800 hover:bg-green-200"
        >
          New Chat
        </button>
      </div>
      <div>
      <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
