import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

interface ConsultationBannerProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function ConsultationBanner({
  title,
  description,
  buttonText,
}: ConsultationBannerProps) {
  return (
    <div className="bg-primary rounded-lg p-8 flex items-center justify-between text-white">
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 opacity-80">{description}</p>
        <Link
          href="/chat"
          className="mt-6 bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors inline-flex items-center"
        >
          <MaterialIcon name="chat" className="text-lg mr-2" />
          {buttonText}
        </Link>
      </div>
      <img
        alt="AI Robot"
        className="w-40 h-40 hidden sm:block"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCscCDXggoUPeNv8k16EYe2a6dQZsEyykVe3DxAIDwXVxOzc6LhF0L3cT12VPMXiGYtK-WBm97vIcvAu7jg_7lUAJzJTJ1KAc1q0QYS7T_BwDHqluwkTFrZhthARi2z5uAQC0AtBSvcDGbUIzaCFuSx_vUXBvG7rlfPFv6fRHWVj1byG6RzMgaTxxbfJfmgQdxBNfoZLyZQ_LqTerJruNw0DJ1pTAUxl_FamnZ9xbQCTT7-ACpCYHirhVGKZb98PKV2A_WmDS9pjabb"
      />
    </div>
  );
}