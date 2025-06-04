"use client";

import React from "react";
import Image from "next/image";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      className="fixed bottom-10 right-6 z-[100] px-6 py-4 bg-gray-800 rounded-full shadow-[0_0_30px_rgba(255,165,0,0.6)]  flex items-center gap-4   border border-orange-400 transition  hover:shadow-[0_0_40px_rgba(255,165,0,0.8)]"
    >
      <Image
        src="/chat-svgrepo-com.svg"
        alt="Chat icon"
        width={36}
        height={36}
        priority
      />
      <span className="text-xl sm:text-2xl font-bold text-orange-600 leading-none tracking-wide">
        Chat with us
      </span>
    </button>
  );
};

export default FloatingButton;
