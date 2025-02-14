// app/reset-password/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { initializeApp } from 'firebase/app';
import { getAuth, confirmPasswordReset, verifyPasswordResetCode, sendPasswordResetEmail } from "firebase/auth";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";


// Initialize Firebase specifically for this page
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on client side
const app = typeof window !== 'undefined' ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Get oobCode from URL
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      setIsInitialRequest(false);
      setIsVerifying(true);
      verifyCode();
    }
  }, [oobCode]);

  const verifyCode = async () => {
    if (!auth) {
      setError("Unable to initialize authentication");
      setIsVerifying(false);
      return;
    }

    try {
      const emailFromCode = await verifyPasswordResetCode(auth, oobCode!);
      setEmail(emailFromCode);
      setIsVerifying(false);
    } catch (error) {
      setError("This password reset link has expired or is invalid");
      console.log(error)
      setIsVerifying(false);
    }
  };

  const handleInitialReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!auth) throw new Error("Authentication not initialized");

      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      });
      
      setSuccess("Password reset link has been sent to your email address");
    } catch (error) {
      let errorMessage = (error as Error).message;
      if (errorMessage.includes("user-not-found")) {
        errorMessage = "No account found with this email address";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!auth) throw new Error("Authentication not initialized");
      
      await confirmPasswordReset(auth, oobCode!, password);
      setSuccess("Password successfully reset. You can now sign in with your new password.");
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      let errorMessage = (error as Error).message;
      if (errorMessage.includes("expired")) {
        errorMessage = "This password reset link has expired. Please request a new one.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isVerifying) {
      return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-4" />
            <p className="text-gray-600">Verifying your reset link...</p>
          </div>
        </div>
      );
    }

    if (isInitialRequest) {
      return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>

          <form onSubmit={handleInitialReset} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-500 p-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white px-6 py-3 rounded-full font-medium transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-gray-600 mb-6 text-center">
          {email ? (
            <>Enter a new password for <span className="font-medium">{email}</span></>
          ) : (
            "Enter your new password"
          )}
        </p>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-500 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white px-6 py-3 rounded-full font-medium transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main className="flex-grow flex flex-col items-center px-4 py-16 max-w-4xl mx-auto">
        <Link href="/" className="mb-8">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            alt="DASH Logo"
            className="mb-4"
          />
        </Link>

        {renderContent()}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Back to Sign In
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;