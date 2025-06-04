"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Props
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Message structure
interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchMessages() {
      try {
        const response = await axios.get("/api/get-message");
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }

    fetchMessages();
  }, [isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const response = await axios.post("/api/send-message", {
      message: input,
      sender: "user",
    });

    setMessages(response.data);
    setInput("");
    scrollToBottom();

    setTimeout(async () => {
      const aiResponse = await axios.post("/api/ai-response", {
        message: input,
      });

      setMessages(aiResponse.data);
      scrollToBottom();
    }, 1000);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex flex-col max-h-[80vh]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Chat</DialogTitle>
            
          </div>
        </DialogHeader>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2" style={{ maxHeight: "300px" }}>
          {messages.map((msg, i) => (
            <ChatMessage key={i} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="mt-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            rows={2}
            className="resize-none"
          />
          <Button
            onClick={handleSend}
            className="mt-2 w-full"
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
