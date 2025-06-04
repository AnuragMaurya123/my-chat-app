"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={cn("flex w-full mb-2", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-sm rounded-lg px-4 py-2 text-sm shadow-md",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
