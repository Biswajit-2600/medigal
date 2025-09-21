import MaterialIcon from "@/components/ui/MaterialIcons";

interface ProfileCardProps {
  name: string;
  patientId: string;
  memberSince: string;
}

export default function ProfileCard({ name, patientId, memberSince }: ProfileCardProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
        <MaterialIcon name="person" className="text-primary text-5xl" />
      </div>
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
        {name}
      </h3>
      <p className="text-subtext-light dark:text-subtext-dark text-sm">
        Patient ID: {patientId}
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/30 text-primary px-4 py-2 rounded-lg mt-4 text-center">
        <p className="text-sm font-medium">Member since</p>
        <p className="font-semibold">{memberSince}</p>
      </div>
    </div>
  );
}