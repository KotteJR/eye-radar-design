"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function SettingsPage() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <div 
      className="h-full rounded-2xl p-6 transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      <h1 
        className="font-['Inter',_sans-serif] font-semibold text-[24px] mb-6 transition-colors duration-200"
        style={{ color: theme.text.primary }}
      >
        Settings
      </h1>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="space-y-4">
          <h2 
            className="font-['Inter',_sans-serif] font-medium text-[14px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Appearance
          </h2>
          
          <div 
            className="p-4 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: theme.surfaceSecondary,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] mb-1 transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Theme
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  {mode === "light" ? "Light mode" : "Dark mode"}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: mode === "light" ? theme.surface : theme.surfaceSecondary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {mode === "light" ? (
                  <Sun size={20} style={{ color: theme.text.primary }} />
                ) : (
                  <Moon size={20} style={{ color: theme.text.primary }} />
                )}
                <span 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  {mode === "light" ? "Switch to Dark" : "Switch to Light"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
