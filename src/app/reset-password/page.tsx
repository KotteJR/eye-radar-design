"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const passwordLongEnough = newPassword.length >= 8;

  const handleResetPassword = () => {
    if (!passwordsMatch || !passwordLongEnough) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
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

          {success ? (
            /* Success State */
            <div className="flex flex-col items-center w-full max-w-sm">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #FF9E75 0%, #FF5A39 100%)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="font-['Inter',_sans-serif] font-semibold text-[26px] leading-[36px] text-[#1B1B1C] mb-2 text-center">
                Password Reset!
              </h1>
              <p className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#919191] mb-8 text-center">
                Your password has been successfully updated. You can now log in with your new password.
              </p>
              <Link
                href="/login"
                className="w-full py-2.5 rounded-lg font-['Inter',_sans-serif] text-[14px] leading-[20px] text-white text-center transition-all hover:opacity-90 block"
                style={{ background: "linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)" }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            /* Reset Form */
            <>
              <h1 className="font-['Inter',_sans-serif] font-semibold text-[26px] leading-[36px] text-[#1B1B1C] mb-2 text-center">
                Set New Password
              </h1>
              <p className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#919191] mb-8 text-center max-w-sm">
                Enter your new password below. Make sure it's at least 8 characters.
              </p>

              <div className="w-full max-w-sm space-y-4">
                {/* New Password */}
                <div>
                  <label className="block font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#FF5A39] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ABABAB] hover:text-[#919191] transition-colors"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {newPassword.length > 0 && !passwordLongEnough && (
                    <p className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[16px] text-[#FF5A39] mt-1">
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-lg bg-[#F8F8F8] border border-[#E3E3E3] font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] text-[#303030] placeholder:text-[#ABABAB] focus:outline-none focus:border-[#FF5A39] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ABABAB] hover:text-[#919191] transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[16px] text-[#FF5A39] mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetPassword}
                  disabled={!passwordsMatch || !passwordLongEnough || isLoading}
                  className="w-full py-2.5 rounded-lg font-['Inter',_sans-serif] text-[14px] leading-[20px] text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)" }}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div
          className="w-1/2 relative flex items-center justify-center"
          style={{ background: "linear-gradient(180deg, #FF7F50 0%, #FF5733 100%)" }}
        >
          <Image src="/login-page.png" alt="Reset Password Graphic" width={400} height={400} className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
