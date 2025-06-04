"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

// Props for ChatModal component
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Message structure type
interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  // State to store chat messages
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  // State to store user input text
  const [input, setInput] = useState("");
  // Ref for auto-scrolling to latest message
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch previous messages when modal opens
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

  // Scroll chat to bottom to show latest message smoothly
  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Handle sending message and receiving AI response
  const handleSend = async () => {
    if (!input.trim()) return;

    // Send user message to backend
    const response = await axios.post("/api/send-message", {
      message: input,
      sender: "user",
    });

    // Update messages with user message
    setMessages(response.data);
    setInput(""); // Clear input box
    scrollToBottom();

    // Get AI response after a short delay
    setTimeout(async () => {
      const aiResponse = await axios.post("/api/ai-response", {
        message: input,
      });

      // Update messages with AI reply
      setMessages(aiResponse.data);
      scrollToBottom();
    }, 1000);
  };

  // Send message on Enter key press (without Shift)
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Don't render modal if it's closed
  if (!isOpen) return null;

  return (
    // Modal backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      {/* Modal container */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl flex flex-col max-h-[80vh] overflow-hidden">
        {/* Modal header with title and close button */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close chat modal"
          >
            ×
          </button>
        </div>

        {/* Chat messages container - scrollable */}
        <div
          className="flex-1 overflow-y-auto px-4 py-2 space-y-2"
          style={{ maxHeight: "300px" }}
        >
          {messages.map((msg, i) => (
            <ChatMessage key={i} text={msg.text} sender={msg.sender} />
          ))}
          {/* Dummy div to scroll into view */}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            rows={2}
            className="w-full resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
          <button
            onClick={handleSend}
            className="mt-2 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
