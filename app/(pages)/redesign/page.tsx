'use client';

import Image from "next/image";
import React from "react";
import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";

const DashLandingPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main className="flex-grow flex flex-col items-center px-4 py-16 md:py-24 max-w-5xl mx-auto justify-center">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeIn}>
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="DASH Logo"
              className="mb-12 hover:scale-105 transition-transform duration-300"
              priority
            />
          </motion.div>

          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-5xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-500 to-gray-700"
          >
            Distributed Adaptive 
            <br className="hidden md:block" />
            Serverless Hosting
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 mb-4 text-center max-w-2xl leading-relaxed"
          >
            A peer-to-peer distributed system for executing serverless functions
            and deploying tasks efficiently using Tauri + Next.js
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center gap-2"
          >
            <Link
              href="/download"
              className="group bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Download
              <span className="text-lg group-hover:translate-y-1 transition-transform duration-300">↓</span>
            </Link>

            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-500 font-medium">
                Available for
              </p>
              <p className="text-sm text-gray-400">
                macOS • Linux • Windows
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default DashLandingPage;