"use client";

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

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Jane Doe",
    age: 42,
    children: 3,
    lastTestDate: "2024-12-10",
    status: "COMPLETED",
    email: "jane.doe@gmail.com",
  },
  {
    id: "2",
    name: "John Smith",
    age: 9,
    grade: "4th Grade A",
    lastTestDate: "2024-12-08",
    status: "ACTIVE",
    email: "john.smith@gmail.com",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    age: 7,
    grade: "2nd Grade B",
    lastTestDate: "2024-12-05",
    status: "ACTIVE",
    email: "sarah.johnson@gmail.com",
  },
  {
    id: "4",
    name: "Michael Brown",
    age: 45,
    children: 2,
    lastTestDate: "2024-11-28",
    status: "COMPLETED",
    email: "michael.brown@gmail.com",
  },
  {
    id: "5",
    name: "Emily Davis",
    age: 8,
    grade: "3rd Grade C",
    lastTestDate: "2024-12-12",
    status: "ACTIVE",
    email: "emily.davis@gmail.com",
  },
  {
    id: "6",
    name: "David Wilson",
    age: 38,
    children: 1,
    lastTestDate: "2024-12-09",
    status: "ACTIVE",
    email: "david.wilson@gmail.com",
  },
  {
    id: "7",
    name: "Jessica Martinez",
    age: 10,
    grade: "5th Grade B",
    lastTestDate: "2024-12-07",
    status: "COMPLETED",
    email: "jessica.martinez@gmail.com",
  },
  {
    id: "8",
    name: "Christopher Anderson",
    age: 40,
    children: 4,
    lastTestDate: "2024-12-04",
    status: "ACTIVE",
    email: "christopher.anderson@gmail.com",
  },
  {
    id: "9",
    name: "Amanda Taylor",
    age: 6,
    grade: "1st Grade A",
    lastTestDate: "2024-12-11",
    status: "ACTIVE",
    email: "amanda.taylor@gmail.com",
  },
  {
    id: "10",
    name: "Robert Thomas",
    age: 47,
    children: 2,
    lastTestDate: "2024-11-30",
    status: "COMPLETED",
    email: "robert.thomas@gmail.com",
  },
  {
    id: "11",
    name: "Lisa Jackson",
    age: 11,
    grade: "6th Grade A",
    lastTestDate: "2024-12-06",
    status: "ACTIVE",
    email: "lisa.jackson@gmail.com",
  },
  {
    id: "12",
    name: "Daniel White",
    age: 32,
    children: 3,
    lastTestDate: "2024-12-03",
    status: "ACTIVE",
    email: "daniel.white@gmail.com",
  },
  {
    id: "13",
    name: "Michelle Harris",
    age: 7,
    grade: "2nd Grade C",
    lastTestDate: "2024-12-01",
    status: "COMPLETED",
    email: "michelle.harris@gmail.com",
  },
  {
    id: "14",
    name: "James Martin",
    age: 44,
    children: 1,
    lastTestDate: "2024-11-29",
    status: "ACTIVE",
    email: "james.martin@gmail.com",
  },
  {
    id: "15",
    name: "Jennifer Thompson",
    age: 9,
    grade: "4th Grade B",
    lastTestDate: "2024-12-13",
    status: "ACTIVE",
    email: "jennifer.thompson@gmail.com",
  },
  {
    id: "16",
    name: "Matthew Garcia",
    age: 37,
    children: 2,
    lastTestDate: "2024-12-02",
    status: "COMPLETED",
    email: "matthew.garcia@gmail.com",
  },
  {
    id: "17",
    name: "Ashley Rodriguez",
    age: 8,
    grade: "3rd Grade A",
    lastTestDate: "2024-12-14",
    status: "ACTIVE",
    email: "ashley.rodriguez@gmail.com",
  },
  {
    id: "18",
    name: "Andrew Lewis",
    age: 41,
    children: 3,
    lastTestDate: "2024-11-27",
    status: "ACTIVE",
    email: "andrew.lewis@gmail.com",
  },
  {
    id: "19",
    name: "Nicole Walker",
    age: 10,
    grade: "5th Grade C",
    lastTestDate: "2024-12-15",
    status: "ACTIVE",
    email: "nicole.walker@gmail.com",
  },
  {
    id: "20",
    name: "Kevin Hall",
    age: 43,
    children: 2,
    lastTestDate: "2024-11-26",
    status: "COMPLETED",
    email: "kevin.hall@gmail.com",
  },
];

interface PatientsListProps {
  onPatientSelect: (patient: Patient) => void;
  selectedPatientId?: string;
  searchValue?: string;
}

export function PatientsList({ onPatientSelect, selectedPatientId, searchValue = "" }: PatientsListProps) {
  const { theme, mode } = useTheme();

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.id.includes(searchValue)
  );

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
            Select Patient
          </h1>
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Choose a patient to view details and begin assessment.
          </p>
        </div>
      </div>

      {/* Patient List - No horizontal padding, extends full width, content aligned with header padding */}
      <div className="flex-1 overflow-y-auto">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => onPatientSelect(patient)}
            className="flex items-center gap-4 cursor-pointer transition-all duration-200 last:border-b-0"
            style={{
              borderBottom: `1px solid ${theme.border}`,
              backgroundColor: selectedPatientId === patient.id 
                ? theme.selected
                : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (selectedPatientId !== patient.id) {
                e.currentTarget.style.backgroundColor = theme.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPatientId !== patient.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {/* Content wrapper with same padding as header */}
            <div className="flex items-center gap-4 w-full px-6 py-3">
              {/* Avatar */}
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: theme.border }}
              >
                <User size={16} style={{ color: theme.text.secondary }} />
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mb-1 transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  {patient.name}
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  {patient.age} years • ID: {patient.id}
                  {patient.grade ? ` • ${patient.grade}` : patient.children ? ` • ${patient.children} Children` : ''}
                </div>
                <div 
                  className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] mt-1 transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  Last test: {patient.lastTestDate}
                </div>
              </div>

            {/* Status Tag */}
            <div
              className="flex-shrink-0 px-3 py-1 font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px]"
              style={{
                borderRadius: '16777200px',
                ...(patient.status === "ACTIVE"
                  ? mode === 'dark'
                    ? {
                        background: 'rgba(149, 99, 199, 0.30)',
                        border: '0.5px solid rgba(149, 99, 199, 0.40)',
                        color: '#B794F6',
                      }
                    : {
                        background: 'rgba(149, 99, 199, 0.10)',
                        border: '0.5px solid rgba(71, 80, 147, 0.10)',
                        color: '#7C3AED',
                      }
                  : mode === 'dark'
                    ? {
                        background: 'rgba(124, 138, 255, 0.30)',
                        border: '0.5px solid rgba(124, 138, 255, 0.40)',
                        color: '#7C8AFF',
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
        ))}
      </div>
    </div>
  );
}
