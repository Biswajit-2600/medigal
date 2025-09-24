import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { mockConsultations } from "@/lib/mock-data";
import ConsultationHistory from "@/components/profile/ConsultationHistory";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-gray-900">{session.user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{session.user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-gray-900">{session.user.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wallet Balance
            </label>
            <p className="mt-1 text-gray-900">{session.user.walletBalance} coins</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900">
          Consultation History
        </h2>
        <div className="mt-4">
          <ConsultationHistory consultations={mockConsultations} />
        </div>
      </div>
      </div>
    </div>
  );
}