import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcons";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
              {/* Welcome Section */}
              <div>
                <h2 className="text-3xl font-bold" style={{ color: "#18181B" }}>
                  Welcome back, {session.user.name}!
                </h2>
                <p className="mt-1" style={{ color: "rgb(100, 116, 139)" }}>
                  Ready to connect with your AI medical assistant today?
                </p>
              </div>
              
              {/* CTA Section */}
              <div 
                className="rounded-lg p-8 flex items-center justify-between text-white"
                style={{ backgroundColor: "#2563EB" }}
              >
                <div>
                  <h3 className="text-2xl font-bold">
                    Start AI Medical Consultation
                  </h3>
                  <p className="mt-2 opacity-80">
                    Get instant medical information and health guidance from our AI assistant
                  </p>
                  <button className="mt-6 bg-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center" style={{ color: "#2563EB" }}>
                    <MaterialIcon name="chat" className="text-lg mr-2" style={{ color: "#2563EB" }} />
                    Start Chat Now
                  </button>
                </div>
                <img
                  alt="AI Robot"
                  className="w-40 h-40 hidden sm:block rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCscCDXggoUPeNv8k16EYe2a6dQZsEyykVe3DxAIDwXVxOzc6LhF0L3cT12VPMXiGYtK-WBm97vIcvAu7jg_7lUAJzJTJ1KAc1q0QYS7T_BwDHqluwkTFrZhthARi2z5uAQC0AtBSvcDGbUIzaCFuSx_vUXBvG7rlfPFv6fRHWVj1byG6RzMgaTxxbfJfmgQdxBNfoZLyZQ_LqTerJruNw0DJ1pTAUxl_FamnZ9xbQCTT7-ACpCYHirhVGKZb98PKV2A_WmDS9pjabb"
                />
              </div>
              
              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Health Questions */}
                <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(220, 252, 231)" }}>
                      <MaterialIcon name="home" style={{ color: "rgb(16, 185, 129)" }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "rgb(100, 116, 139)" }}>Available 24/7</span>
                  </div>
                  <h4 className="text-lg font-semibold mt-4">General Health Questions</h4>
                  <p className="text-sm mt-1" style={{ color: "rgb(100, 116, 139)" }}>
                    Ask about common health concerns, symptoms, and get general medical information
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>2 coins per message</span>
                    <Link 
                      href="/chat" 
                      className="group relative px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1"
                    >
                      <span className="relative z-10 flex items-center space-x-1">
                        <span>Start Chat</span>
                        <MaterialIcon name="arrow_forward" className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Symptom Analysis */}
                <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(243, 232, 255)" }}>
                      <MaterialIcon name="science" style={{ color: "rgb(139, 92, 246)" }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "rgb(100, 116, 139)" }}>AI Powered</span>
                  </div>
                  <h4 className="text-lg font-semibold mt-4">Symptom Analysis</h4>
                  <p className="text-sm mt-1" style={{ color: "rgb(100, 116, 139)" }}>
                    Describe your symptoms and get AI-powered analysis and recommendations
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>2 coins per message</span>
                    <Link 
                      href="/chat" 
                      className="group relative px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1"
                    >
                      <span className="relative z-10 flex items-center space-x-1">
                        <span>Start Chat</span>
                        <MaterialIcon name="arrow_forward" className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Medication Information */}
                <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(255, 237, 213)" }}>
                      <MaterialIcon name="description" style={{ color: "rgb(249, 115, 22)" }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "rgb(100, 116, 139)" }}>Information</span>
                  </div>
                  <h4 className="text-lg font-semibold mt-4">Medication Information</h4>
                  <p className="text-sm mt-1" style={{ color: "rgb(100, 116, 139)" }}>
                    Get details on medications, dosages, and side effects.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>1 coin per query</span>
                    <Link 
                      href="/chat" 
                      className="group relative px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1"
                    >
                      <span className="relative z-10 flex items-center space-x-1">
                        <span>Start Chat</span>
                        <MaterialIcon name="arrow_forward" className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Wellness Tips */}
                <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(219, 234, 254)" }}>
                      <MaterialIcon name="favorite_border" style={{ color: "rgb(59, 130, 246)" }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "rgb(100, 116, 139)" }}>Wellness</span>
                  </div>
                  <h4 className="text-lg font-semibold mt-4">Wellness Tips</h4>
                  <p className="text-sm mt-1" style={{ color: "rgb(100, 116, 139)" }}>
                    Receive tips for a healthier lifestyle, diet, and exercise.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>Free</span>
                    <Link 
                      href="/chat" 
                      className="group relative px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1"
                    >
                      <span className="relative z-10 flex items-center space-x-1">
                        <span>Start Chat</span>
                        <MaterialIcon name="arrow_forward" className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/profile" className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(219, 234, 254)" }}>
                          <MaterialIcon name="person_outline" style={{ color: "rgb(59, 130, 246)" }} />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold" style={{ color: "#18181B" }}>View Profile</p>
                          <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>Manage your account details</p>
                        </div>
                      </div>
                      <MaterialIcon name="chevron_right" className="group-hover:text-primary transition-colors" style={{ color: "rgb(100, 116, 139)" }} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/wallet" className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(254, 249, 195)" }}>
                          <MaterialIcon name="account_balance_wallet" style={{ color: "rgb(234, 179, 8)" }} />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold" style={{ color: "#18181B" }}>Wallet Balance</p>
                          <p className="text-sm" style={{ color: "rgb(100, 116, 139)" }}>{session.user.walletBalance || 150} coins available</p>
                        </div>
                      </div>
                      <MaterialIcon name="chevron_right" className="group-hover:text-primary transition-colors" style={{ color: "rgb(100, 116, 139)" }} />
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Recent Chats */}
              <div className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="text-lg font-semibold">Recent Chats</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/chat" className="flex items-start group">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(220, 252, 231)" }}>
                        <MaterialIcon name="chat_bubble_outline" className="text-xl" style={{ color: "rgb(16, 185, 129)" }} />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{ color: "#18181B" }}>General Health Question</p>
                        <p className="text-sm truncate" style={{ color: "rgb(100, 116, 139)" }}>
                          Asked about headache symptoms - 2 hours ago
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="flex items-start group">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(219, 234, 254)" }}>
                        <MaterialIcon name="medication" className="text-xl" style={{ color: "rgb(59, 130, 246)" }} />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{ color: "#18181B" }}>Medication Information</p>
                        <p className="text-sm truncate" style={{ color: "rgb(100, 116, 139)" }}>
                          Asked about pain medication - Yesterday
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="flex items-start group">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgb(243, 232, 255)" }}>
                        <MaterialIcon name="bedtime" className="text-xl" style={{ color: "rgb(139, 92, 246)" }} />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{ color: "#18181B" }}>Symptom Analysis</p>
                        <p className="text-sm truncate" style={{ color: "rgb(100, 116, 139)" }}>
                          Discussed sleeping issues - 3 days ago
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Important Notice */}
              <div className="rounded-lg p-4 flex items-start" style={{ backgroundColor: "rgb(220, 252, 231)" }}>
                <MaterialIcon name="info" className="mt-1" style={{ color: "rgb(16, 185, 129)" }} />
                <div className="ml-3">
                  <h4 className="font-semibold" style={{ color: "rgb(16, 185, 129)" }}>Important Notice</h4>
                  <p className="text-sm" style={{ color: "rgb(22, 101, 52)" }}>
                    Our AI assistant provides general health information and is not a substitute for professional medical advice. Always consult a qualified doctor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
