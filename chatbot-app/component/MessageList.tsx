'use client'

import React from "react";
import { Message } from '@/types/message'

interface MessageListProps {
  messages: Message[];
}
const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="w-full mx-auto flex flex-col flex-1 overflow-hidden">
    <div className="flex-1 overflow-y-auto p-4" style={{ marginTop: "10px" }}>
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4 pt-16">
        {messages.map((message) =>
          message.sender === "bot" ? (
            <div key={message.id} className="flex items-start space-x-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500">
                <span className="text-xs font-bold text-white">AI</span>
              </span>
              <div className="rounded-lg bg-white px-4 py-3 text-sm text-gray-900 shadow">
                {message.text}
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex items-start justify-end space-x-3">
              <div className="max-w-84 rounded-lg bg-indigo-600 px-4 py-3 text-sm text-white shadow">
                {message.text}
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <span className="text-xs font-bold text-gray-900">U</span>
              </span>
            </div>
          )
        )}
      </div>
    </div>
  </div>
);

export default MessageList;
