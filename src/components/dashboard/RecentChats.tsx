import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

interface RecentChat {
  id: string;
  type: string;
  icon: string;
  iconColor: string;
  iconBgClass: string;
  topic: string;
  description: string;
  timestamp: string;
}

export default function RecentChats() {
  const recentChats: RecentChat[] = [
    {
      id: "1",
      type: "general",
      icon: "chat_bubble_outline",
      iconColor: "text-accent-green",
      iconBgClass: "bg-green-100 dark:bg-green-900/50",
      topic: "General Health Question",
      description: "Asked about headache symptoms",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "medication",
      icon: "medication",
      iconColor: "text-accent-blue",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/50",
      topic: "Medication Information",
      description: "Asked about pain medication",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      type: "symptoms",
      icon: "bedtime",
      iconColor: "text-accent-purple",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/50",
      topic: "Symptom Analysis",
      description: "Discussed sleeping issues",
      timestamp: "3 days ago",
    },
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Recent Chats</h3>
      <ul className="mt-4 space-y-4">
        {recentChats.map((chat) => (
          <li key={chat.id}>
            <Link href={`/chat/${chat.id}`} className="flex items-start group">
              <div className={`${chat.iconBgClass} p-3 rounded-full`}>
                <MaterialIcon name={chat.icon} className={`${chat.iconColor} text-xl`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-semibold text-text-light dark:text-text-dark">
                  {chat.topic}
                </p>
                <p className="text-sm text-muted-light dark:text-muted-dark truncate">
                  {chat.description} - {chat.timestamp}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}