"use client";

import { Target, Clock, Play, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Assessment {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  icon: React.ReactNode;
  iconColor: string;
}

interface AssessmentDetailPanelProps {
  assessment: Assessment | null;
  fromPatientDetail?: boolean;
}

export function AssessmentDetailPanel({ assessment, fromPatientDetail = false }: AssessmentDetailPanelProps) {
  const { theme, mode } = useTheme();
  
  if (!assessment) {
    return (
      <div 
        className="h-full rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div className="mb-4 flex items-center justify-center">
          <img 
            src="/thirdcolumn.svg" 
            alt="Empty state icon" 
            className="w-44 h-44"
          />
        </div>
        <p 
          className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-center transition-colors duration-200"
          style={{ color: theme.text.secondary }}
        >
          Select a test from the list to view details
        </p>
      </div>
    );
  }

  const difficultyLabels = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
  };

  return (
    <div 
      className="flex flex-col h-full rounded-2xl p-6 overflow-y-auto transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div className="flex items-start gap-3 mb-6">
        <div className={`w-12 h-12 rounded-lg ${assessment.iconColor} flex items-center justify-center flex-shrink-0`}>
          {assessment.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 
            className="font-['Inter',_sans-serif] font-medium text-[18px] leading-[30px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            {assessment.title}
          </h2>
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            {assessment.category}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 
          className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] mb-1 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Description
        </h3>
        <p 
          className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
          style={{ color: theme.text.secondary }}
        >
          {assessment.description}
        </p>
      </div>

      <div className="flex items-start gap-6 mb-6">
        <div className="flex flex-col gap-1">
          <h3 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Duration
          </h3>
          <span 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            {assessment.duration} min
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Difficulty
          </h3>
          <span 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            {difficultyLabels[assessment.difficulty]}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 
          className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] mb-3 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Test Overview
        </h3>
        <ul className="list-disc space-y-2 pl-5">
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Comprehensive eye movement tracking and analysis
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Real-time visual attention pattern detection
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Detailed performance metrics and reporting
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Automated data collection and processing
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 
          className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] mb-3 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Requirements
        </h3>
        <ul className="list-disc space-y-2 pl-5">
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Eye tracking device properly calibrated
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Stable internet connection required
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Quiet environment for accurate results
          </li>
          <li 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Patient should be seated comfortably
          </li>
        </ul>
      </div>

      <div className="mt-auto pt-4">
        {fromPatientDetail ? (
          <div className="flex gap-3">
            <button
              className="flex-1 px-6 py-3 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] text-white leading-[20px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
              }}
            >
              <Play size={16} fill="white" />
              Start
            </button>
            <button
              className="flex-1 px-6 py-3 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                color: '#FF5A39',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.surfaceSecondary,
              }}
            >
              <Settings size={16} style={{ color: '#FF5A39' }} />
              Calibrate
            </button>
          </div>
        ) : (
          <button
            className="w-full px-6 py-3 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] text-white leading-[20px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
            }}
          >
            <Play size={16} fill="white" />
            Overview
          </button>
        )}
      </div>
    </div>
  );
}
