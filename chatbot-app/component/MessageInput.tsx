import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface MessageInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  textareaRef,
}) => (
  <div className="w-full mx-auto px-4 py-4 sm:px-6">
    <div className="flex items-center space-x-2 p-3" style={{ marginBottom: "20px" }}>
      <textarea
        ref={textareaRef}
        rows={1}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        className="flex-grow rounded-xl border border-gray-300 px-4 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
        placeholder="Type your message..."
        style={{
          maxHeight: "160px",
          overflowY: inputValue ? "auto" : "hidden",
        }}
      />
      <button
        onClick={handleSendMessage}
        className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default MessageInput;
