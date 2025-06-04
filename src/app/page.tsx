"use client";

import ChatModal from "@/components/ChatModal";
import FloatingButton from "@/components/FloatingButton";
import React, { useState } from "react";


export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen((open) => !open);

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Chat App</h1>
      </main>

      <FloatingButton onClick={toggleChat} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
