'use client'

import { Message } from '@/types/message'
import React, { useState } from 'react'
import Header from '../component/Header'
import Chatbot from "../component/Chatbot";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ])
  const [showHistory, setShowHistory] = useState<boolean>(false)

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const startNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi, Comment puis-je t'aider aujourd'hui?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  return (
    <div className="h-screen w-full flex flex-col relative transition-all duration-300">
      {/* En-tête */}
      <Header onHistoryToggle={toggleHistory} onNewChat={startNewChat} showHistory={showHistory}
      />
      
      {/* Contenu principal */}
      <div className="flex flex-1 transition-all duration-300">
       {/* Contenu du chat (InputBox) */}
       <div
          className={`flex justify-center items-center transition-all duration-300 ${
            showHistory ? "w-[80%]" : "w-full"
          }`}
          id="chatbox"
        >
          <div className="w-[60%]">
            <Chatbot messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  )
}
