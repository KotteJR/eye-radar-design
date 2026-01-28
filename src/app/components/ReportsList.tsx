"use client";

import { FileText, Download, Calendar, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Report {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  date: string;
  score: number;
  status: "COMPLETED" | "PENDING REVIEW";
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    patientName: "Emma Johnson",
    patientId: "1",
    testName: "Eye Tracking Assessment",
    date: "2024-12-10",
    score: 78,
    status: "COMPLETED",
  },
  {
    id: "RPT-002",
    patientName: "Liam Smith",
    patientId: "2",
    testName: "Reading Comprehension",
    date: "2024-12-09",
    score: 85,
    status: "COMPLETED",
  },
  {
    id: "RPT-003",
    patientName: "Olivia Brown",
    patientId: "3",
    testName: "Visual Acuity Test",
    date: "2024-12-08",
    score: 92,
    status: "COMPLETED",
  },
  {
    id: "RPT-004",
    patientName: "Noah Davis",
    patientId: "4",
    testName: "Color Vision Test",
    date: "2024-12-07",
    score: 65,
    status: "COMPLETED",
  },
  {
    id: "RPT-005",
    patientName: "Ava Wilson",
    patientId: "5",
    testName: "Eye Tracking Assessment",
    date: "2024-12-06",
    score: 88,
    status: "COMPLETED",
  },
  {
    id: "RPT-006",
    patientName: "Ethan Martinez",
    patientId: "6",
    testName: "Reading Comprehension",
    date: "2024-12-05",
    score: 0,
    status: "PENDING REVIEW",
  },
  {
    id: "RPT-007",
    patientName: "Sophia Anderson",
    patientId: "7",
    testName: "Visual Field Test",
    date: "2024-12-04",
    score: 91,
    status: "COMPLETED",
  },
  {
    id: "RPT-008",
    patientName: "Mason Taylor",
    patientId: "8",
    testName: "Eye Tracking Assessment",
    date: "2024-12-03",
    score: 74,
    status: "COMPLETED",
  },
  {
    id: "RPT-009",
    patientName: "Isabella Garcia",
    patientId: "9",
    testName: "Visual Field Test",
    date: "2024-12-02",
    score: 89,
    status: "COMPLETED",
  },
  {
    id: "RPT-010",
    patientName: "William Rodriguez",
    patientId: "10",
    testName: "Color Vision Test",
    date: "2024-12-01",
    score: 67,
    status: "COMPLETED",
  },
  {
    id: "RPT-011",
    patientName: "Sophia Lee",
    patientId: "11",
    testName: "Reading Comprehension",
    date: "2024-11-30",
    score: 93,
    status: "COMPLETED",
  },
  {
    id: "RPT-012",
    patientName: "James White",
    patientId: "12",
    testName: "Eye Tracking Assessment",
    date: "2024-11-29",
    score: 0,
    status: "PENDING REVIEW",
  },
  {
    id: "RPT-013",
    patientName: "Charlotte Harris",
    patientId: "13",
    testName: "Visual Acuity Test",
    date: "2024-11-28",
    score: 81,
    status: "COMPLETED",
  },
  {
    id: "RPT-014",
    patientName: "Benjamin Clark",
    patientId: "14",
    testName: "Eye Tracking Assessment",
    date: "2024-11-27",
    score: 76,
    status: "COMPLETED",
  },
  {
    id: "RPT-015",
    patientName: "Amelia Lewis",
    patientId: "15",
    testName: "Reading Comprehension",
    date: "2024-11-26",
    score: 90,
    status: "COMPLETED",
  },
  {
    id: "RPT-016",
    patientName: "Lucas Walker",
    patientId: "16",
    testName: "Visual Field Test",
    date: "2024-11-25",
    score: 0,
    status: "PENDING REVIEW",
  },
  {
    id: "RPT-017",
    patientName: "Harper Hall",
    patientId: "17",
    testName: "Color Vision Test",
    date: "2024-11-24",
    score: 72,
    status: "COMPLETED",
  },
  {
    id: "RPT-018",
    patientName: "Henry Allen",
    patientId: "18",
    testName: "Eye Tracking Assessment",
    date: "2024-11-23",
    score: 85,
    status: "COMPLETED",
  },
  {
    id: "RPT-019",
    patientName: "Evelyn Young",
    patientId: "19",
    testName: "Visual Acuity Test",
    date: "2024-11-22",
    score: 88,
    status: "COMPLETED",
  },
  {
    id: "RPT-020",
    patientName: "Alexander King",
    patientId: "20",
    testName: "Reading Comprehension",
    date: "2024-11-21",
    score: 79,
    status: "COMPLETED",
  },
  {
    id: "RPT-021",
    patientName: "Mia Wright",
    patientId: "21",
    testName: "Eye Tracking Assessment",
    date: "2024-11-20",
    score: 0,
    status: "PENDING REVIEW",
  },
  {
    id: "RPT-022",
    patientName: "Daniel Lopez",
    patientId: "22",
    testName: "Visual Field Test",
    date: "2024-11-19",
    score: 82,
    status: "COMPLETED",
  },
  {
    id: "RPT-023",
    patientName: "Aria Hill",
    patientId: "23",
    testName: "Color Vision Test",
    date: "2024-11-18",
    score: 71,
    status: "COMPLETED",
  },
];

interface ReportsListProps {
  onReportSelect?: (report: Report) => void;
  selectedReportId?: string;
  searchValue?: string;
}

export function ReportsList({ onReportSelect, selectedReportId, searchValue = "" }: ReportsListProps) {
  const { theme, mode } = useTheme();

  const filteredReports = mockReports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchValue.toLowerCase()) ||
      report.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      report.testName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    const isDark = mode === 'dark';
    
    switch (status) {
      case "COMPLETED":
        return {
          color: isDark ? '#7C8AFF' : '#475093',
          background: isDark ? 'rgba(124, 138, 255, 0.30)' : 'rgba(71, 80, 147, 0.10)',
          border: isDark ? '0.5px solid rgba(124, 138, 255, 0.40)' : '0.5px solid rgba(71, 80, 147, 0.15)',
        };
      case "PENDING REVIEW":
        return {
          color: '#FF5A39',
          background: isDark ? 'rgba(255, 90, 57, 0.30)' : 'rgba(255, 90, 57, 0.10)',
          border: isDark ? '0.5px solid rgba(255, 90, 57, 0.40)' : '0.5px solid rgba(255, 90, 57, 0.15)',
        };
      default:
        return {
          color: theme.text.secondary,
          background: 'transparent',
        };
    }
  };

  return (
    <div 
      className="flex flex-col h-full rounded-2xl overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6">
        <h1 
          className="font-['Inter',_sans-serif] font-semibold text-[24px] leading-[36px] mb-2 transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          Assessment Reports
        </h1>
        <p 
          className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-4 transition-colors duration-200"
          style={{ color: theme.text.secondary }}
        >
          View and download patient assessment reports
        </p>
      </div>

      {/* Reports Table Header */}
      <div 
        className="px-6 py-2 border-b transition-colors duration-200"
        style={{ borderBottomColor: theme.border }}
      >
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Patient
            </span>
          </div>
          <div className="col-span-3">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Test Name
            </span>
          </div>
          <div className="col-span-2">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Date
            </span>
          </div>
          <div className="col-span-1">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Score
            </span>
          </div>
          <div className="col-span-2">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Status
            </span>
          </div>
          <div className="col-span-1">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              Actions
            </span>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto">
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <FileText size={48} style={{ color: theme.text.secondary, marginBottom: 16 }} />
            <p 
              className="font-['Inter',_sans-serif] font-normal text-[14px] transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              No reports found
            </p>
          </div>
        ) : (
          filteredReports.map((report) => {
            const statusStyle = getStatusStyle(report.status);
            const isSelected = selectedReportId === report.id;

            return (
              <div
                key={report.id}
                onClick={() => onReportSelect?.(report)}
                className="flex items-center cursor-pointer transition-all duration-200"
                style={{
                  borderBottom: `1px solid ${theme.border}`,
                  backgroundColor: isSelected 
                    ? theme.selected
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = theme.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="grid grid-cols-12 gap-4 items-center w-full px-6 py-3">
                  {/* Patient */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: theme.border }}
                      >
                        <User size={16} style={{ color: theme.text.secondary }} />
                      </div>
                      <span 
                        className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                        style={{ color: theme.text.primary }}
                      >
                        {report.patientName}
                      </span>
                    </div>
                  </div>

                  {/* Test Name */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <FileText size={16} style={{ color: theme.text.secondary }} />
                      <span 
                        className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                        style={{ color: theme.text.primary }}
                      >
                        {report.testName}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} style={{ color: theme.text.secondary }} />
                      <span 
                        className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                        style={{ color: theme.text.secondary }}
                      >
                        {report.date}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-1">
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      {report.score > 0 ? `${report.score} / 100` : '-'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span
                      className="px-3 py-1 font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] inline-block"
                      style={{ 
                        borderRadius: '16777200px',
                        color: statusStyle.color,
                        background: statusStyle.background,
                        border: statusStyle.border,
                      }}
                    >
                      {report.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReportSelect?.(report);
                        }}
                        className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200 hover:opacity-80"
                        style={{ color: theme.text.primary }}
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle download
                        }}
                        className="transition-colors duration-200 hover:opacity-80"
                        style={{
                          color: theme.text.secondary,
                        }}
                        title="Download Report"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
