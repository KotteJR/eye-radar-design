"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        className="w-full max-w-6xl rounded-2xl overflow-hidden flex min-h-[600px] shadow-lg"
        style={{
          border: '1px solid #E3E3E3',
        }}
      >
        {/* Left Panel - Forgot Password Form */}
        <div className="w-1/2 bg-white p-12 flex flex-col items-center justify-center relative">
          {/* Logo */}
          <div className="mb-16">
            <Image
              src="/full-logo.svg"
              alt="eyeRadar Logo"
              width={180}
              height={40}
              className="h-auto"
            />
          </div>

          {/* Title */}
          <h1 className="font-['Inter',_sans-serif] font-semibold text-[30px] leading-[48px] text-[#1B1B1C] mb-3 text-center">
            Forgot Password?
          </h1>
          <p className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#919191] mb-10 text-center max-w-sm">
            No worries! Enter your email and we'll send you a verification code to reset your password.
          </p>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-8 w-full max-w-md">
            <div className="flex-1 h-px bg-[#E3E3E3]"></div>
            <span className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#919191]">
              Recovery
            </span>
            <div className="flex-1 h-px bg-[#E3E3E3]"></div>
          </div>

          {/* Form */}
          <div className="w-full max-w-md space-y-6">
            {/* Email Input */}
            <div>
              <label className="block font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#303030] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={showCodeInput}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#303030] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#FF5A39] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Recover Password Button */}
            {!showCodeInput && (
              <button
                onClick={handleRecoverPassword}
                disabled={!email || isLoading}
                className="w-full py-3 rounded-lg font-['Inter',_sans-serif] text-[16px] leading-[24px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
                showCodeInput ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-4">
                <p className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#303030] mb-4 text-center">
                  Enter the 6-digit code sent to <span className="font-medium">{email}</span>
                </p>
                
                {/* 6 Code Input Boxes */}
                <div className="flex justify-center gap-3 mb-6">
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
                      className="w-12 h-14 text-center rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-semibold text-[20px] text-[#303030] focus:outline-none focus:border-[#FF5A39] focus:ring-2 focus:ring-[#FF5A39]/20 transition-all"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyCode}
                  disabled={code.some((d) => !d)}
                  className="w-full py-3 rounded-lg font-['Inter',_sans-serif] text-[16px] leading-[24px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)",
                  }}
                >
                  Verify Code
                </button>

                {/* Resend Link */}
                <p className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#919191] mt-4 text-center">
                  Didn't receive the code?{" "}
                  <button
                    onClick={() => {
                      setCode(["", "", "", "", "", ""]);
                      // Mock resend
                      alert("Code resent!");
                    }}
                    className="text-[#FF5A39] font-medium hover:underline"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <Link
                href="/login"
                className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-[#919191] hover:text-[#FF5A39] transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>

          {/* Support Link */}
          <div className="mt-auto pt-8 text-center">
            <span className="font-['Inter',_sans-serif] font-normal text-[16px] leading-[24px] text-[#a1a1a1]">
              Need support?{" "}
              <a
                href="mailto:support@eyeRadar.com"
                className="text-[#a1a1a1] font-semibold hover:underline"
              >
                Contact us
              </a>
            </span>
          </div>
        </div>

        {/* Right Panel - Branding Graphic */}
        <div
          className="w-1/2 relative flex items-center justify-center min-h-[600px]"
          style={{
            background: "linear-gradient(180deg, #FF7F50 0%, #FF5733 100%)",
          }}
        >
          <Image
            src="/login-page.png"
            alt="Forgot Password Graphic"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
