'use client'

import { Message } from '@/types/message'
import React, { useState } from 'react'
import Header from '../component/Header'

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
      <Header
        onHistoryToggle={toggleHistory}
        onNewChat={startNewChat}
        showHistory={showHistory}
      />

      {/* Exemple de contenu principal */}
      <div className="flex-1 p-4">
        <p>Hello world</p>
      </div>
    </div>
  )
}
