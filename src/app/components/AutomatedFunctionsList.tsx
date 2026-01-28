"use client";

import { useState } from "react";
import { Play, CircleDot, MoreHorizontal, Clock, Star } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface AutomatedFunction {
  id: string;
  name: string;
  description: string;
  status: "IDLE" | "ACTIVE" | "SCHEDULED";
}

const mockFunctions: AutomatedFunction[] = [
  {
    id: "1",
    name: "Auto identify lines (autoloaduncutga...)",
    description: "Automatically identifies lines in uncutgazeszoom data",
    status: "IDLE",
  },
  {
    id: "2",
    name: "Run not identified lines (runcrasi...)",
    description: "Process lines that were not identified",
    status: "IDLE",
  },
  {
    id: "3",
    name: "Manual identify lines (loaduncutsz...)",
    description: "Manual line identification for 2024 data",
    status: "IDLE",
  },
  {
    id: "4",
    name: "Load audio gazes (ros_audio_main)",
    description: "Load and process audio gaze data",
    status: "IDLE",
  },
  {
    id: "5",
    name: "Steps manual multilines (loaduncutga...)",
    description: "Process multiple lines manually",
    status: "IDLE",
  },
  {
    id: "6",
    name: "Auto identify lines (autoloaduncutga...)",
    description: "Automatically identifies lines in uncutgazeszoom data",
    status: "IDLE",
  },
  {
    id: "7",
    name: "Run not identified lines (runcrasi...)",
    description: "Process lines that were not identified",
    status: "IDLE",
  },
  {
    id: "8",
    name: "Manual identify lines (loaduncutsz...)",
    description: "Manual line identification for 2024 data",
    status: "IDLE",
  },
  {
    id: "9",
    name: "Load audio gazes (ros_audio_main)",
    description: "Load and process audio gaze data",
    status: "IDLE",
  },
  {
    id: "10",
    name: "Steps manual multilines (loaduncutga...)",
    description: "Process multiple lines manually",
    status: "IDLE",
  },
  {
    id: "11",
    name: "Auto identify lines (autoloaduncutga...)",
    description: "Automatically identifies lines in uncutgazeszoom data",
    status: "IDLE",
  },
  {
    id: "12",
    name: "Run not identified lines (runcrasi...)",
    description: "Process lines that were not identified",
    status: "IDLE",
  },
  {
    id: "13",
    name: "Extract gaze patterns (extractgaze...)",
    description: "Extract and analyze gaze movement patterns from raw data",
    status: "IDLE",
  },
  {
    id: "14",
    name: "Generate heatmaps (heatmapgen...)",
    description: "Create visual heatmaps from eye tracking data",
    status: "IDLE",
  },
  {
    id: "15",
    name: "Process fixation data (fixationproc...)",
    description: "Analyze and process fixation point data",
    status: "IDLE",
  },
  {
    id: "16",
    name: "Export session results (exportsession...)",
    description: "Export completed session data to external formats",
    status: "IDLE",
  },
  {
    id: "17",
    name: "Batch process recordings (batchrecord...)",
    description: "Process multiple recording sessions in batch mode",
    status: "IDLE",
  },
  {
    id: "18",
    name: "Validate data integrity (validatedata...)",
    description: "Check and validate data integrity across sessions",
    status: "IDLE",
  },
];

interface AutomatedFunctionsListProps {
  onFunctionSelect?: (func: AutomatedFunction) => void;
  searchValue?: string;
  patient?: { id: string; name: string; age: number; grade?: string; children?: number; lastTestDate: string; status: "ACTIVE" | "COMPLETED" } | null;
  onActiveFunctionsChange?: (functions: AutomatedFunction[]) => void;
}

export function AutomatedFunctionsList({ onFunctionSelect, searchValue = "", patient, onActiveFunctionsChange }: AutomatedFunctionsListProps) {
  const { theme } = useTheme();
  const [activeFunctionIds, setActiveFunctionIds] = useState<Set<string>>(new Set());

  const filteredFunctions = mockFunctions.filter(
    (func) =>
      func.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      func.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRunFunction = (func: AutomatedFunction) => {
    // Add function to active set
    const newActiveIds = new Set([...activeFunctionIds, func.id]);
    setActiveFunctionIds(newActiveIds);
    
    // Notify parent of active functions
    const activeFunctions = mockFunctions.filter((f) => newActiveIds.has(f.id));
    onActiveFunctionsChange?.(activeFunctions);
    
    onFunctionSelect?.(func);
  };

  // Get active functions for sidebar
  const activeFunctions = mockFunctions.filter((func) => activeFunctionIds.has(func.id));

  return (
    <div 
      className="flex flex-col h-full rounded-2xl overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Header */}
      <div className="p-6">
        <h1 
          className="font-['Inter',_sans-serif] font-semibold text-[24px] leading-[36px] mb-2 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Automated Functions
        </h1>
        {patient ? (
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Run automated data processing and analysis functions for <span 
              style={{ 
                background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 500,
              }}
            >{patient.name}</span>
          </p>
        ) : (
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Run automated data processing and analysis functions
          </p>
        )}
      </div>

      {/* Functions Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {filteredFunctions.map((func) => (
            <div
              key={func.id}
              className="rounded-lg p-5 border transition-all duration-200"
              style={{ 
                borderWidth: '1px',
                borderColor: theme.border,
                backgroundColor: 'transparent',
              }}
            >
              <div className="flex items-start justify-between">
                <h3 
                  className="font-['Inter',_sans-serif] font-normal text-[16px] leading-[24px] flex-1 pr-2 transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  {func.name}
                </h3>
                <button
                  onClick={() => patient ? handleRunFunction(func) : undefined}
                  className="px-4 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-white flex items-center gap-2 transition-opacity duration-200 hover:opacity-90 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Play size={14} fill="white" />
                  {patient ? "Run" : "View"}
                </button>
              </div>
              
              <p 
                className="font-['Inter',_sans-serif] font-normal mb-4 text-[14px] leading-[20px] mb-0.5 transition-colors duration-200"
                style={{ color: theme.text.secondary }}
              >
                {func.description}
              </p>

              <div className="flex items-center">
                <span
                  className="px-3 py-1 font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] uppercase inline-block"
                  style={{ 
                    borderRadius: '16777200px',
                    color: theme.text.primary,
                    background: theme.surfaceSecondary,
                  }}
                >
                  {func.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
