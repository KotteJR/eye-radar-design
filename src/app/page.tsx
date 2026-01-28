"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TwoLevelSidebar } from "./components/sidebar";
import { PatientsList } from "./components/PatientsList";
import { PatientDetailPanel } from "./components/PatientDetailPanel";
import { AssessmentsList } from "./components/AssessmentsList";
import { AssessmentDetailPanel } from "./components/AssessmentDetailPanel";
import { ReportsList } from "./components/ReportsList";
import { AutomatedFunctionsList } from "./components/AutomatedFunctionsList";
import { AddPatientModal } from "./components/AddPatientModal";
import { AddPartnerModal } from "./components/AddPartnerModal";
import { SettingsPage } from "./components/SettingsPage";

interface Patient {
  id: string;
  name: string;
  age: number;
  grade?: string;
  children?: number;
  lastTestDate: string;
  status: "ACTIVE" | "COMPLETED";
}

// Assessment type is defined in AssessmentsList component

export default function Home() {
  const { theme, mode } = useTheme();
  const [activeSection, setActiveSection] = useState("patients");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  // Track if assessments was navigated from patient detail panel
  const [assessmentsFromPatient, setAssessmentsFromPatient] = useState<Patient | null>(null);
  // Track if automated functions was navigated from patient detail panel
  const [automatedFunctionsFromPatient, setAutomatedFunctionsFromPatient] = useState<Patient | null>(null);
  // Track selected assessment category filter
  const [assessmentCategoryFilter, setAssessmentCategoryFilter] = useState<string>("All tests");
  // Track search values
  const [patientSearchValue, setPatientSearchValue] = useState<string>("");
  const [assessmentSearchValue, setAssessmentSearchValue] = useState<string>("");
  const [reportSearchValue, setReportSearchValue] = useState<string>("");
  const [automatedFunctionSearchValue, setAutomatedFunctionSearchValue] = useState<string>("");
  const [activeAutomatedFunctions, setActiveAutomatedFunctions] = useState<any[]>([]);

  const handleSavePatient = (patientData: any) => {
    // Handle saving patient data
    console.log("Saving patient:", patientData);
    // You can add logic here to save to state or API
  };

  const handleSavePartner = (partnerData: any) => {
    // Handle saving partner data
    console.log("Saving partner:", partnerData);
    // You can add logic here to save to state or API
  };

  return (
    <>
      <div 
        className="flex overflow-hidden transition-colors duration-200" 
        style={{ 
          height: '100vh',
          backgroundColor: theme.background === '#FFFFFF' ? '#FAFAFA' : theme.background
        }}
      >
        <div className="flex-shrink-0 pt-[25px] pb-[25px] pl-[25px] h-full flex items-stretch">
          <div className="h-full">
            <TwoLevelSidebar 
              activeSection={activeSection}
              onSectionChange={(section) => {
                setActiveSection(section);
                // Clear patient context when navigating from navbar to tests (not from patient detail)
                // Only keep patient context if we're already in tests and have a patient
                if (section === "tests" && !assessmentsFromPatient) {
                  // Navigating to tests from navbar - clear any existing patient context
                  setAssessmentsFromPatient(null);
                } else if (section !== "tests") {
                  // Navigating away from tests - clear patient context
                  setAssessmentsFromPatient(null);
                }
                // Clear automated functions patient context when navigating away
                if (section === "automated-functions" && !automatedFunctionsFromPatient) {
                  setAutomatedFunctionsFromPatient(null);
                } else if (section !== "automated-functions") {
                  setAutomatedFunctionsFromPatient(null);
                }
              }}
              onAddPatientClick={() => setIsAddPatientModalOpen(true)}
              onAddPartnerClick={() => setIsAddPartnerModalOpen(true)}
              assessmentsPatient={assessmentsFromPatient}
              assessmentCategoryFilter={assessmentCategoryFilter}
              onAssessmentCategoryFilterChange={setAssessmentCategoryFilter}
              searchValue={
                activeSection === "patients" 
                  ? patientSearchValue 
                  : activeSection === "tests" 
                  ? assessmentSearchValue 
                  : activeSection === "reports"
                  ? reportSearchValue
                  : activeSection === "automated-functions"
                  ? automatedFunctionSearchValue
                  : ""
              }
              onSearchChange={
                activeSection === "patients" 
                  ? setPatientSearchValue 
                  : activeSection === "tests" 
                  ? setAssessmentSearchValue 
                  : activeSection === "reports"
                  ? setReportSearchValue
                  : activeSection === "automated-functions"
                  ? setAutomatedFunctionSearchValue
                  : () => {}
              }
              activeAutomatedFunctions={activeAutomatedFunctions}
            />
          </div>
        </div>

        {/* Dynamic Content Area - Changes based on activeSection */}
        {activeSection === "patients" && (
          <>
            <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 h-full overflow-hidden">
              <PatientsList
                onPatientSelect={setSelectedPatient}
                selectedPatientId={selectedPatient?.id}
                searchValue={patientSearchValue}
              />
            </div>
            <div className="flex-shrink-0 w-94 pt-[25px] pr-[25px] pb-[25px] pl-6 h-full overflow-hidden">
              <PatientDetailPanel 
                patient={selectedPatient} 
                onNavigateToAssessments={(patient) => {
                  setAssessmentsFromPatient(patient);
                  setActiveSection("tests");
                }}
                onNavigateToAutomatedFunctions={(patient) => {
                  setAutomatedFunctionsFromPatient(patient);
                  setActiveSection("automated-functions");
                }}
              />
            </div>
          </>
        )}

        {activeSection === "tests" && (
          <>
            <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 h-full overflow-hidden">
              <AssessmentsList
                onAssessmentSelect={setSelectedAssessment}
                selectedAssessmentId={selectedAssessment?.id}
                patient={assessmentsFromPatient}
                categoryFilter={assessmentCategoryFilter}
                searchValue={assessmentSearchValue}
              />
            </div>
            <div className="flex-shrink-0 w-94 pt-[25px] pr-[25px] pb-[25px] pl-6 h-full overflow-hidden">
              <AssessmentDetailPanel 
                assessment={selectedAssessment} 
                fromPatientDetail={!!assessmentsFromPatient}
              />
            </div>
          </>
        )}

        {activeSection === "reports" && (
          <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 pr-[25px] h-full overflow-hidden">
            <ReportsList
              searchValue={reportSearchValue}
              onReportSelect={(report) => {
                // Handle report selection if needed
                console.log("Selected report:", report);
              }}
            />
          </div>
        )}

        {activeSection === "calendar" && (
          <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 pr-[25px] h-full overflow-hidden">
            <div 
              className="flex flex-col h-full rounded-2xl overflow-hidden transition-colors duration-200"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div className="p-6">
                <h1 
                  className="font-['Inter',_sans-serif] font-semibold text-[24px] leading-[36px] mb-2 transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Select Calendar
                </h1>
                <p 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  Choose a calendar view to manage appointments and schedules.
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="text-center py-20 px-6">
                  <p 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] transition-colors duration-200"
                    style={{ color: theme.text.secondary }}
                  >
                    Calendar content coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "automated-functions" && (
          <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 pr-[25px] h-full overflow-hidden">
            <AutomatedFunctionsList 
              searchValue={automatedFunctionSearchValue}
              patient={automatedFunctionsFromPatient}
              onActiveFunctionsChange={setActiveAutomatedFunctions}
            />
          </div>
        )}

        {activeSection === "calibrate" && (
          <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 pr-[25px] h-full overflow-hidden">
            <div 
              className="h-full rounded-2xl p-6 transition-colors duration-200"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
              }}
            >
              <h1 
                className="font-['Inter',_sans-serif] font-semibold text-[24px] mb-2 transition-colors duration-200"
                style={{ color: theme.text.primary }}
              >
                Calibration
              </h1>
              <div className="text-center py-20">
                <p 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] transition-colors duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  Calibration content coming soon...
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "settings" && (
          <div className="flex-1 min-w-0 pt-[25px] pb-[25px] pl-6 pr-[25px] h-full overflow-hidden">
            <SettingsPage />
          </div>
        )}
      </div>

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={handleSavePatient}
      />
      <AddPartnerModal
        isOpen={isAddPartnerModalOpen}
        onClose={() => setIsAddPartnerModalOpen(false)}
        onSave={handleSavePartner}
      />
    </>
  );
}


