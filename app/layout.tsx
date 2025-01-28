import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DASH | Distributed Adaptive Serverless Hosting",
  description: "DASH is a distributed adaptive serverless hosting platform that ensures seamless scalability and high performance.",
  keywords: [
    "DASH",
    "serverless hosting",
    "distributed hosting",
    "adaptive hosting",
    "scalable platform",
  ],
  authors: [{ name: "Adithya Krishnan", url: "https://www.adithyakrishnan.com" },{name:"Ferwin Lopez"},{name:"Nevia Sebastian"},{name:"Nikita Nair"}],
  openGraph: {
    title: "DASH | Distributed Adaptive Serverless Hosting",
    description: "Seamlessly scalable and adaptive serverless hosting platform.",
    url: "https://dash-webpage.vercel.app/",
    siteName: "DASH Platform",
    images: [
      {
        url: "https://dash-webpage.vercel.app/dash.jpg",
        width: 1200,
        height: 630,
        alt: "DASH - Distributed Adaptive Serverless Hosting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
