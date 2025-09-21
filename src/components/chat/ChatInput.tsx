import MaterialIcon from "../ui/MaterialIcons";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  coinsPerMessage?: number;
}

export default function ChatInput({ onSendMessage, coinsPerMessage = 2 }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-3 pr-16 pl-4 focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark"
          placeholder="Type your health question here..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <MaterialIcon name="send" className="text-white" />
        </button>
      </form>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        {coinsPerMessage} coins per message • Press Enter to send
      </p>
    </div>
  );
}