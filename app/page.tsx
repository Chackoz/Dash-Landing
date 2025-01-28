"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginModal } from "./components/LoginModal";
import ProfileMenu from "./components/ProfileMenu";

const DashLandingPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl">DASH</h1>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="https://github.com/Chackoz/Dash-Desktop"
              className="text-gray-800 hover:text-gray-600"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Chackoz/Dash-Desktop/blob/master/README.md"
              className="text-gray-800 hover:text-gray-600"
            >
              Documentation
            </a>
          </div>
        </div>

      
          
             <div className="flex items-center gap-4">
  <ProfileMenu 
    user={user} 
    logout={logout}
    onLoginClick={() => setIsLoginOpen(true)}
  />
        </div>
      </nav>

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
          <a
            href="/download"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            Download <span className="text-lg -mt-[2]">↓</span>
          </a>
          {/* <button className="border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2">
            <Github className="h-5 w-5" />
            View on GitHub
          </button> */}
          <h2 className="text-sm text-gray-500 md:max-w-[70%] text-center ">
            Available for macOS, Linux, and Windows
          </h2>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 text-sm text-gray-500 flex justify-between items-center border-t border-gray-100">
        <span>© 2025 DASH - MIT License</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/Chackoz/Dash-Desktop"
            className="text-gray-800 hover:text-gray-600"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Chackoz/Dash-Desktop/blob/master/README.md"
            className="text-gray-800 hover:text-gray-600"
          >
            Documentation
          </a>
          <a href="/dowonload" className="hover:text-gray-800">
            Download
          </a>
        </div>
      </footer>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
};

export default DashLandingPage;
