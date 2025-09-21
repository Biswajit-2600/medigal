import MaterialIcon from "../ui/MaterialIcons";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
      {messages.map((message, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
            <MaterialIcon 
              name={message.type === 'user' ? 'person' : 'smart_toy'} 
              className="text-gray-500 dark:text-gray-400 text-xl" 
            />
          </div>
          <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg rounded-tl-none max-w-lg">
              <p className="text-sm text-text-light dark:text-text-dark">
                {message.content}
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {message.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}