import "./globals.css";

import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Quicksand } from "next/font/google";
import { Suspense } from "react";
import { ReviewProvider } from "@/contexts/ReviewContext";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Review Co-Pilot",
  description: "Co Pilot for all your customer reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased bg-[#181818] text-white`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <ReviewProvider>{children}</ReviewProvider>
        </Suspense>
      </body>
    </html>
  );
}
