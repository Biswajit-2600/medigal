import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MaterialIcon from "@/components/ui/MaterialIcons";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MedConsult - AI Medical Consultation",
  description: "Get instant medical information and health guidance from our AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}>
        {/* This injects the Material Icons styles */}
        <MaterialIcon name="init" className="hidden" />
        {children}
      </body>
    </html>
  );
}
