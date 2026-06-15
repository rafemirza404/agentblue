/**
 * ChatMessage Component
 * Displays individual chat message
 */

import type { ChatMessage as ChatMessageType } from '@/types/models';

interface ChatMessageProps {
  message: ChatMessageType;
  logo: string;
}

export const ChatMessage = ({ message, logo }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-end ${message.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      {message.isBot && (
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-[0_2px_8px_rgba(20,20,40,0.1)] ring-1 ring-black/5">
          <img src={logo} alt="Bot" className="w-full h-full object-contain" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 whitespace-pre-line text-[13.5px] leading-relaxed ${
          message.isBot
            ? 'bg-white text-[#1a1a2e] rounded-2xl rounded-bl-md shadow-[0_2px_10px_-2px_rgba(20,20,40,0.08)] ring-1 ring-black/[0.04]'
            : 'bg-gradient-to-br from-[#5A86FF] to-[#4F7CFF] text-white rounded-2xl rounded-br-md shadow-[0_4px_14px_-3px_rgba(79,124,255,0.45)]'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};
