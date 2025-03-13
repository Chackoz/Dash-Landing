import React from "react";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const DashLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col p-4">
      <NavBar />

      <section className=" bg-[#f0efea] h-[80vh] flex justify-center items-center flex-col rounded-xl">
        <div className=" mx-auto px-4 text-center">
          <h1 className="text-8xl font-normal mb-6 big-shoulders-inline">
            Build with <span className="font-bold public-sans">DASH</span>
          </h1>
          
          <p className="text-3xl text-gray-700 quicksand">
          Distributed Adaptive Serverless Hosting
          </p>
          <p className="py-4">A peer-to-peer distributed system for executing serverless functions and deploying tasks efficiently  </p>
          
        
          
          <Link 
            href="/download" 
            className="inline-flex items-center text-sm text-gray-200 hover:text-gray-100 bg-[#2d2d2d] px-6 py-2 rounded-full"
          >
            DOWNLOAD  
          </Link>
        </div>
      </section>

     

      {/* <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
          Download <span className="ml-2 bg-white text-black rounded-full px-2 flex items-center justify-center">DASH</span>
        </button>
      </div> */}

      <Footer />
    </div>
  );
};

export default DashLandingPage;