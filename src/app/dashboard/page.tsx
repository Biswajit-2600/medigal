import AppLayout from "@/components/layout/AppLayout";
import ConsultationBanner from "@/components/dashboard/ConsultationBanner";
import ConsultationCard from "@/components/dashboard/ConsultationCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentChats from "@/components/dashboard/RecentChats";
import ImportantNotice from "@/components/dashboard/ImportantNotice";

export default function DashboardPage() {
  const consultationTypes = [
    {
      iconName: "home",
      iconColor: "text-accent-green",
      iconBgClass: "bg-green-100 dark:bg-green-900/50",
      tagText: "Available 24/7",
      title: "General Health Questions",
      description: "Ask about common health concerns, symptoms, and get general medical information",
      pricing: "2 coins per message",
    },
    {
      iconName: "science",
      iconColor: "text-accent-purple",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/50",
      tagText: "AI Powered",
      title: "Symptom Analysis",
      description: "Describe your symptoms and get AI-powered analysis and recommendations",
      pricing: "2 coins per message",
    },
    {
      iconName: "description",
      iconColor: "text-accent-orange",
      iconBgClass: "bg-orange-100 dark:bg-orange-900/50",
      tagText: "Information",
      title: "Medication Information",
      description: "Get details on medications, dosages, and side effects.",
      pricing: "1 coin per query",
    },
    {
      iconName: "favorite_border",
      iconColor: "text-accent-blue",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/50",
      tagText: "Wellness",
      title: "Wellness Tips",
      description: "Receive tips for a healthier lifestyle, diet, and exercise.",
      pricing: "Free",
    },
  ];

  return (
    <AppLayout>
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
                Welcome back, Dr. Sarah Johnson!
              </h2>
              <p className="text-muted-light dark:text-muted-dark mt-1">
                Ready to connect with your AI medical assistant today?
              </p>
            </div>

            <ConsultationBanner
              title="Start AI Medical Consultation"
              description="Get instant medical information and health guidance from our AI assistant"
              buttonText="Start Chat Now"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultationTypes.map((type) => (
                <ConsultationCard
                  key={type.title}
                  {...type}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <QuickActions balance={150} />
            <RecentChats />
            <ImportantNotice />
          </div>
        </div>
      </main>
    </AppLayout>
  );
}