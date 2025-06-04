"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={cn("flex w-full mb-2", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-sm",
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
        )}
      >
        <CardContent className="p-3 text-sm">
          {text}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatMessage;
