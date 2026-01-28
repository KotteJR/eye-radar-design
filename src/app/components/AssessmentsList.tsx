"use client";

import { useState } from "react";
import { Clock, Target, Search, Play, Eye, Brain, BookOpen } from "lucide-react";
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

const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "Advanced Eye Tracking",
    category: "Eye Tracking",
    description: "Comprehensive eye movement analysis using advanced tracking technology to assess visual attention and processing patterns.",
    duration: 30,
    difficulty: "HARD",
    icon: <Target size={20} className="text-white" />,
    iconColor: "bg-[#6B488D]",
  },
  {
    id: "2",
    title: "Word Recognition Test",
    category: "Reading",
    description: "Evaluate reading comprehension and word recognition skills through structured assessment tasks.",
    duration: 20,
    difficulty: "EASY",
    icon: <Search size={20} className="text-white" />,
    iconColor: "bg-[#3B82F6]",
  },
  {
    id: "3",
    title: "Visual Processing Speed",
    category: "Visual Processing",
    description: "Measure the speed and accuracy of visual information processing and pattern recognition abilities.",
    duration: 25,
    difficulty: "MEDIUM",
    icon: <Clock size={20} className="text-white" />,
    iconColor: "bg-[#FF5A39]",
  },
  {
    id: "4",
    title: "Visual Processing Speed",
    category: "Visual Processing",
    description: "Measure the speed and accuracy of visual information processing and pattern recognition abilities.",
    duration: 25,
    difficulty: "MEDIUM",
    icon: <Clock size={20} className="text-white" />,
    iconColor: "bg-[#A86CCF]",
  },
  {
    id: "5",
    title: "Reading Assessment",
    category: "Reading",
    description: "Comprehensive evaluation of reading skills including fluency, comprehension, and vocabulary.",
    duration: 25,
    difficulty: "MEDIUM",
    icon: <Clock size={20} className="text-white" />,
    iconColor: "bg-[#3B82F6]",
  },
  {
    id: "6",
    title: "Color Vision Assessment",
    category: "Visual Processing",
    description: "Test color perception and discrimination abilities to identify color vision deficiencies and processing patterns.",
    duration: 15,
    difficulty: "EASY",
    icon: <Eye size={20} className="text-white" />,
    iconColor: "bg-[#10B981]",
  },
  {
    id: "7",
    title: "Cognitive Processing Test",
    category: "Cognitive",
    description: "Assess cognitive processing speed, working memory, and executive function through structured tasks.",
    duration: 35,
    difficulty: "HARD",
    icon: <Brain size={20} className="text-white" />,
    iconColor: "bg-[#8189C6]",
  },
  {
    id: "8",
    title: "Comprehensive Literacy Evaluation",
    category: "Reading",
    description: "In-depth assessment of literacy skills including phonemic awareness, decoding, and reading comprehension.",
    duration: 40,
    difficulty: "HARD",
    icon: <BookOpen size={20} className="text-white" />,
    iconColor: "bg-[#A86CCF]",
  },
];

interface AssessmentsListProps {
  onAssessmentSelect: (assessment: Assessment | null) => void;
  selectedAssessmentId?: string;
  patient?: { id: string; name: string; age: number; grade?: string; children?: number; lastTestDate: string; status: "ACTIVE" | "COMPLETED" } | null;
  categoryFilter?: string;
  searchValue?: string;
}

export function AssessmentsList({ onAssessmentSelect, selectedAssessmentId, patient, categoryFilter = "All tests", searchValue = "" }: AssessmentsListProps) {
  const { theme } = useTheme();
  
  const getDifficultyStyle = (difficulty: "EASY" | "MEDIUM" | "HARD") => {
    switch (difficulty) {
      case "EASY":
        return {
          color: '#10B981',
          background: 'rgba(16, 185, 129, 0.20)'
        };
      case "MEDIUM":
        return {
          color: '#FF5A39',
          background: 'rgba(255, 90, 57, 0.20)'
        };
      case "HARD":
        return {
          color: '#FF0004',
          background: 'rgba(255, 0, 4, 0.20)'
        };
    }
  };

  // Filter assessments based on category and search
  let filteredAssessments = categoryFilter === "All tests" 
    ? mockAssessments 
    : mockAssessments.filter(assessment => assessment.category === categoryFilter);
  
  // Apply search filter
  if (searchValue) {
    filteredAssessments = filteredAssessments.filter(assessment =>
      assessment.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      assessment.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <div 
      className="flex flex-col h-full rounded-2xl overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Header - with padding */}
      <div className="p-6">
        <div className="mb-2">
        <h1 
          className="font-['Inter',_sans-serif] font-semibold text-[24px] leading-[36px] mb-2 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Select Assessment
        </h1>
        {patient ? (
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Choose a test for <span 
              style={{ 
                background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 500,
              }}
            >{patient.name}</span> to view details and begin assessment.
          </p>
        ) : (
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Choose a test to view details and begin assessment.
          </p>
        )}
        </div>
      </div>

      {/* Assessment List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-6 pb-6">
          {filteredAssessments.map((assessment) => {
          const isSelected = selectedAssessmentId === assessment.id;
          const difficultyStyle = getDifficultyStyle(assessment.difficulty);

          return (
            <div
              key={assessment.id}
              onClick={() => onAssessmentSelect(assessment)}
              className="p-5 rounded-lg border cursor-pointer transition-all duration-200"
              style={{ 
                borderWidth: '1px',
                borderColor: theme.border,
                backgroundColor: isSelected ? '#F9F9F9' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#F9F9F9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-start gap-4 ">
                <div className={`w-10 h-10 rounded-lg ${assessment.iconColor} flex items-center justify-center flex-shrink-0`}>
                  {assessment.icon}
                </div>
                <div className="flex-1 min-w-0 -ml-10 pl-10">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-['Inter',_sans-serif] font-normal text-[16px] leading-[24px] mb-0.5 transition-colors duration-200"
                        style={{ color: theme.text.primary }}
                      >
                        {assessment.title}
                      </h3>
                      <p 
                        className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-1 transition-colors duration-200"
                        style={{ color: theme.text.secondary }}
                      >
                        {assessment.category}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] flex-shrink-0"
                      style={{ 
                        borderRadius: '16777200px',
                        color: difficultyStyle.color,
                        background: difficultyStyle.background
                      }}
                    >
                      {assessment.difficulty}
                    </span>
                  </div>
                  <p 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-2 max-w-[800px] transition-colors duration-200"
                    style={{ color: theme.text.secondary }}
                  >
                    {assessment.description}
                  </p>
                  <div className="flex items-center gap-1">
                    <Clock size={14} style={{ color: theme.text.secondary }} />
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      {assessment.duration} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
