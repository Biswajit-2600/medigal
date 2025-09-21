interface ChatHistoryItem {
  doctor: string;
  date: string;
  time: string;
}

interface RecentChatsProps {
  chats: ChatHistoryItem[];
}

import MaterialIcon from "@/components/ui/MaterialIcons";

export default function RecentChats({ chats }: RecentChatsProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-text-light dark:text-text-dark">Recent Chats</h4>
        <MaterialIcon name="chat" className="text-primary text-2xl" />
      </div>
      <div className="space-y-4">
        {chats.map((chat, index) => (
          <div key={index} className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-text-light dark:text-text-dark font-medium">
                Dr. {chat.doctor}
              </p>
              <p className="text-sm text-subtext-light dark:text-subtext-dark">
                {chat.date} at {chat.time}
              </p>
            </div>
            <button className="text-primary hover:text-primary/90 transition-colors">
              <MaterialIcon name="arrow_forward" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}