import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

interface QuickActionProps {
  icon: string;
  iconColor: string;
  iconBgClass: string;
  title: string;
  subtitle: string;
  href: string;
}

interface QuickActionsProps {
  balance: number;
}

export default function QuickActions({ balance }: QuickActionsProps) {
  const actions: QuickActionProps[] = [
    {
      icon: "person_outline",
      iconColor: "text-primary",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/50",
      title: "View Profile",
      subtitle: "Manage your account details",
      href: "/profile",
    },
    {
      icon: "account_balance_wallet",
      iconColor: "text-yellow-500",
      iconBgClass: "bg-yellow-100 dark:bg-yellow-900/50",
      title: "Wallet Balance",
      subtitle: `${balance} coins available`,
      href: "/wallet",
    },
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <ul className="mt-4 space-y-4">
        {actions.map((action) => (
          <li key={action.title}>
            <Link href={action.href} className="flex items-center justify-between group">
              <div className="flex items-center">
                <div className={`${action.iconBgClass} p-3 rounded-full`}>
                  <MaterialIcon name={action.icon} className={action.iconColor} />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-text-light dark:text-text-dark">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    {action.subtitle}
                  </p>
                </div>
              </div>
              <MaterialIcon 
                name="chevron_right" 
                className="text-muted-light dark:text-muted-dark group-hover:text-primary transition-colors" 
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}