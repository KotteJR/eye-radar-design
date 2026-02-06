"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = () => {
    if (!email) return;
    setIsLoading(true);
    // Mock delay for sending email
    setTimeout(() => {
      setIsLoading(false);
      setShowCodeInput(true);
    }, 800);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyCode = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      // Mock verification - in real app would verify with backend
      alert("Code verified! Redirecting to reset password...");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div 
        className="w-full max-w-4xl rounded-2xl overflow-hidden flex shadow-lg"
        style={{
          border: '1px solid #E3E3E3',
        }}
      >
        {/* Left Panel - Forgot Password Form */}
        <div className="w-[55%] bg-white p-10 flex flex-col items-center justify-center relative">
          {/* Back Button - Top Left */}
          <Link
            href="/login"
            className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center rounded-lg border border-[#E3E3E3] bg-white hover:bg-[#F8F8F8] transition-colors"
          >
            <ArrowLeft size={16} className="text-[#919191]" />
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/full-logo.svg"
              alt="eyeRadar Logo"
              width={160}
              height={36}
              className="h-auto"
            />
          </div>

          {/* Title */}
          <h1 className="font-['Inter',_sans-serif] font-semibold text-[26px] leading-[36px] text-[#1B1B1C] mb-2 text-center">
            Forgot Password?
          </h1>
          <p className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#919191] mb-8 text-center max-w-sm">
            Enter your email and we'll send you a verification code.
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
                disabled={showCodeInput}
                className="w-full px-4 py-2.5 rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#FF5A39] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Recover Password Button */}
            {!showCodeInput && (
              <button
                onClick={handleRecoverPassword}
                disabled={!email || isLoading}
                className="w-full py-2.5 rounded-lg font-['Inter',_sans-serif] text-[14px] leading-[20px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)",
                }}
              >
                {isLoading ? "Sending..." : "Recover my password"}
              </button>
            )}

            {/* Verification Code Boxes - Animate in */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                showCodeInput ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2">
                <p className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] text-[#919191] mb-3 text-center">
                  Enter the 6-digit code sent to <span className="font-medium text-[#303030]">{email}</span>
                </p>
                
                {/* 6 Code Input Boxes */}
                <div className="flex justify-center gap-2.5 mb-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-11 h-12 text-center rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-semibold text-[18px] text-[#303030] focus:outline-none focus:border-[#FF5A39] focus:ring-2 focus:ring-[#FF5A39]/20 transition-all"
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyCode}
                  disabled={code.some((d) => !d)}
                  className="w-full py-2.5 rounded-lg font-['Inter',_sans-serif] text-[14px] leading-[20px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)",
                  }}
                >
                  Verify Code
                </button>

                {/* Resend Link */}
                <p className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] text-[#919191] mt-3 text-center">
                  Didn't receive the code?{" "}
                  <button
                    onClick={() => {
                      setCode(["", "", "", "", "", ""]);
                      alert("Code resent!");
                    }}
                    className="text-[#FF5A39] font-medium hover:underline"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Branding Graphic */}
        <div
          className="w-[45%] relative flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #FF7F50 0%, #FF5733 100%)",
          }}
        >
          <Image
            src="/login-page.png"
            alt="Forgot Password Graphic"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
