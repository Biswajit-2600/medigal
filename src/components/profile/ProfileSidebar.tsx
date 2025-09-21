import ProfileCard from "./ProfileCard";
import WalletBalance from "./WalletBalance";
import RecentChats from "./RecentChats";

interface ProfileSidebarProps {
  name: string;
  patientId: string;
  memberSince: string;
  walletBalance: string;
  recentChats: Array<{
    doctor: string;
    date: string;
    time: string;
  }>;
}

export default function ProfileSidebar({
  name,
  patientId,
  memberSince,
  walletBalance,
  recentChats,
}: ProfileSidebarProps) {
  return (
    <div className="w-full lg:w-80">
      <ProfileCard
        name={name}
        patientId={patientId}
        memberSince={memberSince}
      />
      <WalletBalance balance={walletBalance} />
      <RecentChats chats={recentChats} />
    </div>
  );
}