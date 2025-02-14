import Image from "next/image";
import React from "react";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const DashLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-4 py-16 max-w-4xl mx-auto justify-center">
        <Image
          src="/logo.png"
          width={120}
          height={120}
          alt="DASH Logo"
          className="mb-8"
        />

        <h1 className="text-4xl font-bold mb-4 text-center">
          Distributed Adaptive Serverless Hosting
        </h1>

        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
          A peer-to-peer distributed system for executing serverless functions
          and deploying tasks efficiently using Tauri + Next.js
        </p>

        <div className="flex gap-4 mb-12 flex-col justify-center items-center">
          <Link
            href="/download"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            Download <span className="text-lg -mt-[2]">↓</span>
          </Link>
          {/* <Link
            href="/docs"
            className="border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition flex items-center gap-2"
          >
            View Documentation
          </Link> */}
          <h2 className="text-sm text-gray-500 md:max-w-[70%] text-center ">
            Available for macOS, Linux, and Windows
          </h2>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashLandingPage;