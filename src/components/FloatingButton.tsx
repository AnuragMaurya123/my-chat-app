"use client";

import React from "react";
import Image from "next/image";
import { RainbowButton } from "./magicui/rainbow-button";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <RainbowButton
      onClick={onClick}
      className="fixed bottom-10 right-6 z-[100] px-8 py-12 rounded-full shadow-[0_0_30px_rgba(255,165,0,0.6)] animate-pulse flex items-center gap-5 bg-white backdrop-blur-lg border border-orange-400 transition hover:scale-105 hover:shadow-[0_0_40px_rgba(255,165,0,0.8)]"
      aria-label="Open chat"
    >
      {/* Use next/image for SVG in public folder */}
      <Image
        src="/chat-svgrepo-com.svg"
        alt="Chat icon"
        width={50}
        height={50}
        priority
      />

      <span className="text-2xl font-bold text-orange-600 leading-none tracking-wide">
        Chat with us
      </span>
    </RainbowButton>
  );
};

export default FloatingButton;
