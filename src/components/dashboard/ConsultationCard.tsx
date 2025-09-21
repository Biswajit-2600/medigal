import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

interface ConsultationCardProps {
  iconName: string;
  iconColor: string;
  iconBgClass: string;
  tagText: string;
  title: string;
  description: string;
  pricing: string;
}

export default function ConsultationCard({
  iconName,
  iconColor,
  iconBgClass,
  tagText,
  title,
  description,
  pricing,
}: ConsultationCardProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`${iconBgClass} p-3 rounded-full`}>
          <MaterialIcon name={iconName} className={iconColor} />
        </div>
        <span className="text-xs font-medium text-muted-light dark:text-muted-dark">
          {tagText}
        </span>
      </div>
      <h4 className="text-lg font-semibold mt-4">{title}</h4>
      <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
        {description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-semibold text-primary">{pricing}</span>
        <Link
          href="/chat"
          className="text-sm font-semibold text-primary hover:underline flex items-center"
        >
          Start Chat
          <MaterialIcon name="arrow_forward" className="text-base ml-1" />
        </Link>
      </div>
    </div>
  );
}