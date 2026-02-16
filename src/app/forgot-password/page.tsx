"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = () => {
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div 
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex shadow-lg"
        style={{ border: '1px solid #E3E3E3' }}
      >
        {/* Left Panel */}
        <div className="w-1/2 bg-white p-10 flex flex-col items-center justify-center relative">
          {/* Back Button */}
          <Link
            href="/login"
            className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center rounded-lg border border-[#E3E3E3] bg-white hover:bg-[#F8F8F8] transition-colors"
          >
            <ArrowLeft size={16} className="text-[#919191]" />
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <Image src="/full-logo.svg" alt="eyeRadar Logo" width={160} height={36} className="h-auto" />
          </div>

          {/* Title */}
          <h1 className="font-['Inter',_sans-serif] font-semibold text-[26px] leading-[36px] text-[#1B1B1C] mb-2 text-center">
            Forgot Password?
          </h1>
          <p className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#919191] mb-8 text-center max-w-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>

          {/* Form */}
          <div className="w-full max-w-sm space-y-4">
            {/* Email Input */}
            <div>
              <label className="block font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={emailSent}
                className="w-full px-4 py-2.5 rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#FF5A39] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Recover Button */}
            {!emailSent && (
              <button
                onClick={handleRecoverPassword}
                disabled={!email || isLoading}
                className="w-full py-2.5 rounded-lg font-['Inter',_sans-serif] text-[14px] leading-[20px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)" }}
              >
                {isLoading ? "Sending..." : "Recover my password"}
              </button>
            )}

            {/* Success message */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                emailSent ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2 text-center">
                <p className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[20px] text-[#919191]">
                  We've sent a reset link to <span className="font-medium text-[#303030]">{email}</span>. Check your inbox and click the link to set a new password.
                </p>
                <button
                  onClick={() => { setEmailSent(false); setEmail(""); }}
                  className="mt-3 font-['Inter',_sans-serif] font-medium text-[13px] text-[#FF5A39] hover:underline"
                >
                  Try a different email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="w-1/2 relative flex items-center justify-center"
          style={{ background: "linear-gradient(180deg, #FF7F50 0%, #FF5733 100%)" }}
        >
          <Image src="/login-page.png" alt="Forgot Password Graphic" width={400} height={400} className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
