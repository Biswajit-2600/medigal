import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MaterialIcon from "@/components/ui/MaterialIcons";
import { Providers } from "@/components/providers/Providers";

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
    <html lang="en" className="light">
      <body className={`${roboto.variable} font-display bg-background-light text-text-light`}>
        {/* This injects the Material Icons styles */}
        <MaterialIcon name="init" className="hidden" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
