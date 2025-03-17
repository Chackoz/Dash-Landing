import React from "react";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const DashLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white  p-4 flex flex-col justify-between  w-full">
      <NavBar />

      <section className=" bg-[#f0efea] min-h-full flex justify-center items-center flex-col rounded-xl flex-1">
        <div className=" mx-auto px-4 text-center">
         
          <div className="text-[9rem] font-nanumMyeongjo">DASH</div>

          <p className="text-3xl text-gray-700 font-rationale">
            Distributed Adaptive Serverless Hosting
          </p>
          <p className="py-4 ">
            A peer-to-peer distributed system for executing serverless functions
            and deploying tasks efficiently{" "}
          </p>

          <Link
            href="/download"
            className="inline-flex items-center text-sm text-gray-200 hover:text-gray-100 bg-[#2d2d2d] px-6 py-2 rounded-full gap-2"
          >
            DOWNLOAD
            <span className="text-lg group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </Link>
          <div className="flex flex-col items-center gap-2 py-2">
              <p className="text-sm text-gray-500 font-medium">
                Available for
              </p>
              <p className="text-sm text-gray-400">
                macOS • Linux • Windows
              </p>
            </div>
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
