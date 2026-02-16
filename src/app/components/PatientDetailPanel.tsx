"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Patient {
  id: string;
  name: string;
  age: number;
  grade?: string;
  children?: number;
  lastTestDate: string;
  status: "ACTIVE" | "COMPLETED";
  email?: string;
}

interface Child {
  id: string;
  name: string;
  age: number;
  class: string;
  patientId: string;
}

interface Test {
  id: string;
  name: string;
  completedDate: string;
  patientId: string;
}

const mockChildren: Child[] = [
  { id: "1", name: "Jill Doe", age: 9, class: "Class 4A", patientId: "1" },
  { id: "2", name: "John Doe", age: 7, class: "Class 2B", patientId: "1" },
];

const mockTests: Test[] = [
  { id: "1", name: "Reading Assessment", completedDate: "2024-12-10", patientId: "1" },
  { id: "2", name: "Comprehension Assessment", completedDate: "2024-12-10", patientId: "1" },
];

interface PatientDetailPanelProps {
  patient: Patient | null;
  onNavigateToAssessments?: (patient: Patient) => void;
  onNavigateToAutomatedFunctions?: (patient: Patient) => void;
  onViewFullProfile?: () => void;
}

export function PatientDetailPanel({ patient, onNavigateToAssessments, onNavigateToAutomatedFunctions, onViewFullProfile }: PatientDetailPanelProps) {
  const { theme, mode } = useTheme();

  if (!patient) {
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
          Select a patient to view details
        </p>
      </div>
    );
  }

  const patientChildren = mockChildren.filter((child) => child.patientId === patient.id);
  const patientTests = mockTests.filter((test) => test.patientId === patient.id);

  return (
    <div 
      className="flex flex-col h-full rounded-2xl p-6 gap-6 overflow-y-auto transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Patient Summary Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: theme.border }}
          >
            <User size={20} style={{ color: theme.text.secondary }} />
          </div>
          <div className="flex-1">
            <div 
              className="font-['Inter',_sans-serif] font-semibold text-[18px] leading-[27px] transition-colors duration-200"
              style={{ color: theme.text.primary }}
            >
              {patient.name}
            </div>
            <div 
              className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              {patient.age} years • ID: {patient.id}
            </div>
            {patient.email && (
              <div 
                className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] mt-1 transition-colors duration-200"
                style={{ color: theme.text.secondary }}
              >
                {patient.email}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Last Assessment
          </span>
          <span 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            {patient.lastTestDate}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Status
          </span>
          <div className="flex items-center">
            <div
              className="inline-flex px-3 py-1 font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px]"
              style={{
                borderRadius: '16777200px',
                ...(patient.status === "ACTIVE"
                  ? {
                      background: 'rgba(149, 99, 199, 0.10)',
                      border: '0.5px solid rgba(71, 80, 147, 0.10)',
                      color: '#7C3AED',
                    }
                  : {
                      background: 'rgba(71, 80, 147, 0.10)',
                      border: '0.5px solid rgba(71, 80, 147, 0.15)',
                      color: '#475093',
                    }),
              }}
            >
              {patient.status}
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Adult Section - Only show for children (patients with grade) */}
      {patient.grade && (
        <div className="flex flex-col gap-3">
          <h2 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Guardian Adult
          </h2>
          <div 
            className="border rounded-2xl p-4 transition-colors duration-200"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.surfaceSecondary,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: theme.border }}
              >
                <User size={16} style={{ color: theme.text.secondary }} />
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  {patient.name}
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  42 years • ID: 123123
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  jane.doe@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Children Section - Only show for adults (patients with children) */}
      {patient.children !== undefined && (
        <div className="flex flex-col gap-3">
          <h2 
            className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Children
          </h2>

          <div 
            className="border rounded-2xl overflow-hidden transition-colors duration-200"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.surfaceSecondary,
            }}
          >
            {patientChildren.length > 0 ? (
              patientChildren.map((child, index) => (
                <div
                  key={child.id}
                  className="flex items-center gap-3 px-4 py-3 transition-colors duration-200"
                  style={{
                    borderBottom: index !== patientChildren.length - 1 ? `1px solid ${theme.border}` : 'none',
                    backgroundColor: theme.surface,
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: theme.border }}
                  >
                    <User size={16} style={{ color: theme.text.secondary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                      style={{ color: theme.text.primary }}
                    >
                      {child.name}
                    </div>
                    <div 
                      className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      {child.age} years • {child.class}
                    </div>
                    <div 
                      className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mt-1 transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      ID: {child.id}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div 
                className="flex items-center gap-3 px-4 py-3 transition-colors duration-200"
                style={{ backgroundColor: theme.surface }}
              >
                <div className="flex-1 min-w-0">
                  <div 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-1 transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    No kids
                  </div>
                  <button className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] bg-gradient-to-r from-[#FF5A39] to-[#FF9E75] text-transparent bg-clip-text">
                    Add children
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test History Section */}
      <div className="flex flex-col gap-3">
        <h2 
          className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Test History
        </h2>

        {patientTests.length > 0 ? (
          <div className="space-y-3">
            {patientTests.map((test) => (
              <div
                key={test.id}
                className="p-3 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: theme.surfaceSecondary }}
              >
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-1 transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  {test.name}
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  Completed on {test.completedDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="p-3 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: theme.surfaceSecondary }}
          >
            <div 
              className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              No tests yet
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-auto pt-4">
        <button 
          className="w-full h-10 bg-gradient-to-r from-[#FF5A39] to-[#FF9E75] text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] hover:opacity-90 transition-opacity"
          onClick={onViewFullProfile}
        >
          View Full Profile
        </button>
        <button 
          className="w-full h-10 text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] hover:opacity-90 transition-opacity"
          style={{
            background: 'linear-gradient(90deg, #8189C6 0%, #303FAE 100%)',
          }}
          onClick={() => patient && onNavigateToAssessments?.(patient)}
        >
          Assessments
        </button>
        <button 
          className="w-full h-10 text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] hover:opacity-90 transition-opacity"
          style={{
            background: 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
          }}
          onClick={() => patient && onNavigateToAutomatedFunctions?.(patient)}
        >
          Automated Functions
        </button>
      </div>
    </div>
  );
}
