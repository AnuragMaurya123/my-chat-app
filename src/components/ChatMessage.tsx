"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Utility to conditionally join class names

interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  // Determine if the message is from the user
  const isUser = sender === "user";

  return (
    // Container div with flex layout and alignment based on sender
    <div className={cn("flex w-full mb-2", isUser ? "justify-end" : "justify-start")}>
      {/* Message bubble styling changes based on sender */}
      <div
        className={cn(
          "max-w-sm rounded-lg px-4 py-2 text-sm shadow-md",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"   // User message styling
            : "bg-gray-100 text-gray-800 rounded-bl-none" // AI message styling
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
