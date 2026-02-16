"use client";

import { useState } from "react";
import { User, ArrowLeft, Settings, Calendar, Globe, Heart, BookOpen, Stethoscope, FileText, Shield } from "lucide-react";
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

interface PatientFullProfileProps {
  patient: Patient;
  onBack: () => void;
}

const tabs = [
  { id: "personal", label: "Personal" },
  { id: "social", label: "Social" },
  { id: "ophthalmological", label: "Ophthalmological/Hearing" },
  { id: "learning", label: "Learning" },
  { id: "clinical", label: "Clinical" },
  { id: "report", label: "Report" },
  { id: "intervention", label: "Intervention" },
];

interface FieldRowProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  onEdit?: (value: string) => void;
  theme: any;
}

function FieldRow({ icon, label, value, editable = true, onEdit, theme }: FieldRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onEdit?.(editValue);
    setIsEditing(false);
  };

  return (
    <div 
      className="flex items-start gap-4 py-4 transition-colors duration-200"
      style={{ borderBottom: `1px solid ${theme.border}` }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {icon && <span style={{ color: theme.text.secondary }}>{icon}</span>}
          <span 
            className="font-['Inter',_sans-serif] font-medium text-[13px] leading-[20px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            {label}
          </span>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 h-8 px-3 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
              style={{
                backgroundColor: theme.input.background,
                border: `1px solid ${theme.input.border}`,
                color: theme.text.primary,
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") { setEditValue(value); setIsEditing(false); }
              }}
            />
            <button
              onClick={handleSave}
              className="px-3 h-8 rounded-lg text-white font-['Inter',_sans-serif] text-[12px] hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)' }}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span 
              className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[20px] transition-colors duration-200"
              style={{ color: value && value !== "—" ? theme.text.secondary : theme.text.disabled }}
            >
              {value || "—"}
            </span>
            {editable && (
              <button
                onClick={() => setIsEditing(true)}
                className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] bg-gradient-to-r from-[#FF5A39] to-[#FF9E75] text-transparent bg-clip-text hover:opacity-80 transition-opacity ml-2"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function PatientFullProfile({ patient, onBack }: PatientFullProfileProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("personal");

  // Determine if this is a child (has grade) or adult (has children count)
  const isChild = !!patient.grade;
  const isAdult = !isChild;

  // Mock editable data — differs based on adult vs child
  const [personalData, setPersonalData] = useState({
    firstName: patient.name.split(" ")[0] || "",
    lastName: patient.name.split(" ").slice(1).join(" ") || "",
    birthDate: isChild ? "2016-06-15" : "1982-03-22",
    age: `${patient.age} years old`,
    nativeLanguage: "English",
    class: patient.grade || undefined,
    registrationDate: "November 21, 2025",
    // Child: show parent email/phone. Adult: show own email/phone
    email: isChild ? "parent@gmail.com" : (patient.email || "—"),
    phone: isChild ? undefined : "—",
    parentEmail: isChild ? "parent@gmail.com" : undefined,
    parentPhone: isChild ? "+1 555-0123" : undefined,
  });

  const [socialData, setSocialData] = useState(
    isChild
      ? {
          familyStructure: "—",
          siblings: "—",
          livingSituation: "—",
          primaryCaregiver: "—",
          languageAtHome: "—",
          culturalBackground: "—",
          hobbies: "—",
          socialBehavior: "—",
          peerRelationships: "—",
        }
      : {
          maritalStatus: "—",
          occupation: "—",
          livingSituation: "—",
          languageAtHome: "—",
          culturalBackground: "—",
          numberOfDependents: "—",
          supportNetwork: "—",
          hobbies: "—",
          socialBehavior: "—",
        }
  );

  const [ophthalmologicalData, setOphthalmologicalData] = useState({
    visualAcuityRight: "—",
    visualAcuityLeft: "—",
    colorVision: "—",
    glasses: "—",
    lastEyeExam: "—",
    eyeConditions: "—",
    hearingRight: "—",
    hearingLeft: "—",
    hearingAids: "—",
    lastHearingTest: "—",
    hearingConditions: "—",
  });

  const [learningData, setLearningData] = useState(
    isChild
      ? {
          learningDisabilities: "—",
          readingLevel: "—",
          writingLevel: "—",
          mathLevel: "—",
          attentionNotes: "—",
          iepStatus: "—",
          accommodations: "—",
          tutoring: "—",
          preferredLearningStyle: "—",
        }
      : {
          educationLevel: "—",
          literacyLevel: "—",
          cognitiveNotes: "—",
          attentionNotes: "—",
          comprehensionNotes: "—",
        }
  );

  const [clinicalData, setClinicalData] = useState({
    primaryDiagnosis: "—",
    secondaryDiagnosis: "—",
    medications: "—",
    allergies: "—",
    surgicalHistory: "—",
    ...(isChild ? { developmentalMilestones: "—" } : {}),
    behavioralNotes: "—",
    referralSource: "—",
    primaryPhysician: "—",
  });

  const [reportData, setReportData] = useState({
    latestReport: "—",
    reportDate: "—",
    reportAuthor: "—",
    reportSummary: "—",
    recommendations: "—",
    followUpDate: "—",
  });

  const [interventionData, setInterventionData] = useState({
    currentInterventions: "—",
    interventionStartDate: "—",
    interventionFrequency: "—",
    therapist: "—",
    goals: "—",
    progress: "—",
    ...(isChild ? { parentInvolvement: "—", homeExercises: "—" } : {}),
    nextReview: "—",
  });

  const updateField = (section: string, field: string, value: string) => {
    switch (section) {
      case "personal": setPersonalData(prev => ({ ...prev, [field]: value })); break;
      case "social": setSocialData(prev => ({ ...prev, [field]: value })); break;
      case "ophthalmological": setOphthalmologicalData(prev => ({ ...prev, [field]: value })); break;
      case "learning": setLearningData(prev => ({ ...prev, [field]: value })); break;
      case "clinical": setClinicalData(prev => ({ ...prev, [field]: value })); break;
      case "report": setReportData(prev => ({ ...prev, [field]: value })); break;
      case "intervention": setInterventionData(prev => ({ ...prev, [field]: value })); break;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div>
            <FieldRow icon={<User size={14} />} label="First Name" value={personalData.firstName} onEdit={(v) => updateField("personal", "firstName", v)} theme={theme} />
            <FieldRow icon={<User size={14} />} label="Last Name" value={personalData.lastName} onEdit={(v) => updateField("personal", "lastName", v)} theme={theme} />
            <FieldRow icon={<Calendar size={14} />} label="Birth Date / Age" value={personalData.age} onEdit={(v) => updateField("personal", "age", v)} theme={theme} />
            <FieldRow icon={<Globe size={14} />} label="Native Language" value={personalData.nativeLanguage} onEdit={(v) => updateField("personal", "nativeLanguage", v)} theme={theme} />
            {isChild && personalData.class && (
              <FieldRow icon={<BookOpen size={14} />} label="Class" value={personalData.class} onEdit={(v) => updateField("personal", "class", v)} theme={theme} />
            )}
            <FieldRow icon={<Calendar size={14} />} label="Registration Date" value={personalData.registrationDate} editable={false} theme={theme} />
            {isAdult && (
              <>
                <FieldRow label="Email" value={personalData.email || "—"} onEdit={(v) => updateField("personal", "email", v)} theme={theme} />
                <FieldRow label="Phone" value={personalData.phone || "—"} onEdit={(v) => updateField("personal", "phone", v)} theme={theme} />
              </>
            )}
            {isChild && (
              <>
                <FieldRow label="Guardian Email" value={personalData.parentEmail || "—"} onEdit={(v) => updateField("personal", "parentEmail", v)} theme={theme} />
                <FieldRow label="Guardian Phone" value={personalData.parentPhone || "—"} onEdit={(v) => updateField("personal", "parentPhone", v)} theme={theme} />
              </>
            )}
          </div>
        );
      case "social":
        if (isChild) {
          const d = socialData as any;
          return (
            <div>
              <FieldRow label="Family Structure" value={d.familyStructure} onEdit={(v) => updateField("social", "familyStructure", v)} theme={theme} />
              <FieldRow label="Siblings" value={d.siblings} onEdit={(v) => updateField("social", "siblings", v)} theme={theme} />
              <FieldRow label="Living Situation" value={d.livingSituation} onEdit={(v) => updateField("social", "livingSituation", v)} theme={theme} />
              <FieldRow label="Primary Caregiver" value={d.primaryCaregiver} onEdit={(v) => updateField("social", "primaryCaregiver", v)} theme={theme} />
              <FieldRow label="Language at Home" value={d.languageAtHome} onEdit={(v) => updateField("social", "languageAtHome", v)} theme={theme} />
              <FieldRow label="Cultural Background" value={d.culturalBackground} onEdit={(v) => updateField("social", "culturalBackground", v)} theme={theme} />
              <FieldRow label="Hobbies / Interests" value={d.hobbies} onEdit={(v) => updateField("social", "hobbies", v)} theme={theme} />
              <FieldRow label="Social Behavior" value={d.socialBehavior} onEdit={(v) => updateField("social", "socialBehavior", v)} theme={theme} />
              <FieldRow label="Peer Relationships" value={d.peerRelationships} onEdit={(v) => updateField("social", "peerRelationships", v)} theme={theme} />
            </div>
          );
        } else {
          const d = socialData as any;
          return (
            <div>
              <FieldRow label="Marital Status" value={d.maritalStatus} onEdit={(v) => updateField("social", "maritalStatus", v)} theme={theme} />
              <FieldRow label="Occupation" value={d.occupation} onEdit={(v) => updateField("social", "occupation", v)} theme={theme} />
              <FieldRow label="Living Situation" value={d.livingSituation} onEdit={(v) => updateField("social", "livingSituation", v)} theme={theme} />
              <FieldRow label="Language at Home" value={d.languageAtHome} onEdit={(v) => updateField("social", "languageAtHome", v)} theme={theme} />
              <FieldRow label="Cultural Background" value={d.culturalBackground} onEdit={(v) => updateField("social", "culturalBackground", v)} theme={theme} />
              <FieldRow label="Number of Dependents" value={d.numberOfDependents} onEdit={(v) => updateField("social", "numberOfDependents", v)} theme={theme} />
              <FieldRow label="Support Network" value={d.supportNetwork} onEdit={(v) => updateField("social", "supportNetwork", v)} theme={theme} />
              <FieldRow label="Hobbies / Interests" value={d.hobbies} onEdit={(v) => updateField("social", "hobbies", v)} theme={theme} />
              <FieldRow label="Social Behavior" value={d.socialBehavior} onEdit={(v) => updateField("social", "socialBehavior", v)} theme={theme} />
            </div>
          );
        }
      case "ophthalmological":
        return (
          <div>
            <h4 
              className="font-['Inter',_sans-serif] font-medium text-[14px] mt-2 mb-1 transition-colors duration-200"
              style={{ color: theme.text.primary }}
            >
              Vision
            </h4>
            <FieldRow label="Visual Acuity (Right)" value={ophthalmologicalData.visualAcuityRight} onEdit={(v) => updateField("ophthalmological", "visualAcuityRight", v)} theme={theme} />
            <FieldRow label="Visual Acuity (Left)" value={ophthalmologicalData.visualAcuityLeft} onEdit={(v) => updateField("ophthalmological", "visualAcuityLeft", v)} theme={theme} />
            <FieldRow label="Color Vision" value={ophthalmologicalData.colorVision} onEdit={(v) => updateField("ophthalmological", "colorVision", v)} theme={theme} />
            <FieldRow label="Corrective Lenses" value={ophthalmologicalData.glasses} onEdit={(v) => updateField("ophthalmological", "glasses", v)} theme={theme} />
            <FieldRow label="Last Eye Exam" value={ophthalmologicalData.lastEyeExam} onEdit={(v) => updateField("ophthalmological", "lastEyeExam", v)} theme={theme} />
            <FieldRow label="Eye Conditions" value={ophthalmologicalData.eyeConditions} onEdit={(v) => updateField("ophthalmological", "eyeConditions", v)} theme={theme} />
            
            <h4 
              className="font-['Inter',_sans-serif] font-medium text-[14px] mt-6 mb-1 transition-colors duration-200"
              style={{ color: theme.text.primary }}
            >
              Hearing
            </h4>
            <FieldRow label="Hearing (Right)" value={ophthalmologicalData.hearingRight} onEdit={(v) => updateField("ophthalmological", "hearingRight", v)} theme={theme} />
            <FieldRow label="Hearing (Left)" value={ophthalmologicalData.hearingLeft} onEdit={(v) => updateField("ophthalmological", "hearingLeft", v)} theme={theme} />
            <FieldRow label="Hearing Aids" value={ophthalmologicalData.hearingAids} onEdit={(v) => updateField("ophthalmological", "hearingAids", v)} theme={theme} />
            <FieldRow label="Last Hearing Test" value={ophthalmologicalData.lastHearingTest} onEdit={(v) => updateField("ophthalmological", "lastHearingTest", v)} theme={theme} />
            <FieldRow label="Hearing Conditions" value={ophthalmologicalData.hearingConditions} onEdit={(v) => updateField("ophthalmological", "hearingConditions", v)} theme={theme} />
          </div>
        );
      case "learning":
        if (isChild) {
          const d = learningData as any;
          return (
            <div>
              <FieldRow label="Learning Disabilities" value={d.learningDisabilities} onEdit={(v) => updateField("learning", "learningDisabilities", v)} theme={theme} />
              <FieldRow label="Reading Level" value={d.readingLevel} onEdit={(v) => updateField("learning", "readingLevel", v)} theme={theme} />
              <FieldRow label="Writing Level" value={d.writingLevel} onEdit={(v) => updateField("learning", "writingLevel", v)} theme={theme} />
              <FieldRow label="Math Level" value={d.mathLevel} onEdit={(v) => updateField("learning", "mathLevel", v)} theme={theme} />
              <FieldRow label="Attention Notes" value={d.attentionNotes} onEdit={(v) => updateField("learning", "attentionNotes", v)} theme={theme} />
              <FieldRow label="IEP Status" value={d.iepStatus} onEdit={(v) => updateField("learning", "iepStatus", v)} theme={theme} />
              <FieldRow label="Accommodations" value={d.accommodations} onEdit={(v) => updateField("learning", "accommodations", v)} theme={theme} />
              <FieldRow label="Tutoring" value={d.tutoring} onEdit={(v) => updateField("learning", "tutoring", v)} theme={theme} />
              <FieldRow label="Preferred Learning Style" value={d.preferredLearningStyle} onEdit={(v) => updateField("learning", "preferredLearningStyle", v)} theme={theme} />
            </div>
          );
        } else {
          const d = learningData as any;
          return (
            <div>
              <FieldRow label="Education Level" value={d.educationLevel} onEdit={(v) => updateField("learning", "educationLevel", v)} theme={theme} />
              <FieldRow label="Literacy Level" value={d.literacyLevel} onEdit={(v) => updateField("learning", "literacyLevel", v)} theme={theme} />
              <FieldRow label="Cognitive Notes" value={d.cognitiveNotes} onEdit={(v) => updateField("learning", "cognitiveNotes", v)} theme={theme} />
              <FieldRow label="Attention Notes" value={d.attentionNotes} onEdit={(v) => updateField("learning", "attentionNotes", v)} theme={theme} />
              <FieldRow label="Comprehension Notes" value={d.comprehensionNotes} onEdit={(v) => updateField("learning", "comprehensionNotes", v)} theme={theme} />
            </div>
          );
        }
      case "clinical": {
        const d = clinicalData as any;
        return (
          <div>
            <FieldRow label="Primary Diagnosis" value={d.primaryDiagnosis} onEdit={(v) => updateField("clinical", "primaryDiagnosis", v)} theme={theme} />
            <FieldRow label="Secondary Diagnosis" value={d.secondaryDiagnosis} onEdit={(v) => updateField("clinical", "secondaryDiagnosis", v)} theme={theme} />
            <FieldRow label="Medications" value={d.medications} onEdit={(v) => updateField("clinical", "medications", v)} theme={theme} />
            <FieldRow label="Allergies" value={d.allergies} onEdit={(v) => updateField("clinical", "allergies", v)} theme={theme} />
            <FieldRow label="Surgical History" value={d.surgicalHistory} onEdit={(v) => updateField("clinical", "surgicalHistory", v)} theme={theme} />
            {isChild && (
              <FieldRow label="Developmental Milestones" value={d.developmentalMilestones} onEdit={(v) => updateField("clinical", "developmentalMilestones", v)} theme={theme} />
            )}
            <FieldRow label="Behavioral Notes" value={d.behavioralNotes} onEdit={(v) => updateField("clinical", "behavioralNotes", v)} theme={theme} />
            <FieldRow label="Referral Source" value={d.referralSource} onEdit={(v) => updateField("clinical", "referralSource", v)} theme={theme} />
            <FieldRow label="Primary Physician" value={d.primaryPhysician} onEdit={(v) => updateField("clinical", "primaryPhysician", v)} theme={theme} />
          </div>
        );
      }
      case "report":
        return (
          <div>
            <FieldRow label="Latest Report" value={reportData.latestReport} onEdit={(v) => updateField("report", "latestReport", v)} theme={theme} />
            <FieldRow label="Report Date" value={reportData.reportDate} onEdit={(v) => updateField("report", "reportDate", v)} theme={theme} />
            <FieldRow label="Report Author" value={reportData.reportAuthor} onEdit={(v) => updateField("report", "reportAuthor", v)} theme={theme} />
            <FieldRow label="Summary" value={reportData.reportSummary} onEdit={(v) => updateField("report", "reportSummary", v)} theme={theme} />
            <FieldRow label="Recommendations" value={reportData.recommendations} onEdit={(v) => updateField("report", "recommendations", v)} theme={theme} />
            <FieldRow label="Follow-up Date" value={reportData.followUpDate} onEdit={(v) => updateField("report", "followUpDate", v)} theme={theme} />
          </div>
        );
      case "intervention": {
        const d = interventionData as any;
        return (
          <div>
            <FieldRow label="Current Interventions" value={d.currentInterventions} onEdit={(v) => updateField("intervention", "currentInterventions", v)} theme={theme} />
            <FieldRow label="Start Date" value={d.interventionStartDate} onEdit={(v) => updateField("intervention", "interventionStartDate", v)} theme={theme} />
            <FieldRow label="Frequency" value={d.interventionFrequency} onEdit={(v) => updateField("intervention", "interventionFrequency", v)} theme={theme} />
            <FieldRow label="Therapist" value={d.therapist} onEdit={(v) => updateField("intervention", "therapist", v)} theme={theme} />
            <FieldRow label="Goals" value={d.goals} onEdit={(v) => updateField("intervention", "goals", v)} theme={theme} />
            <FieldRow label="Progress" value={d.progress} onEdit={(v) => updateField("intervention", "progress", v)} theme={theme} />
            {isChild && (
              <>
                <FieldRow label="Parent Involvement" value={d.parentInvolvement} onEdit={(v) => updateField("intervention", "parentInvolvement", v)} theme={theme} />
                <FieldRow label="Home Exercises" value={d.homeExercises} onEdit={(v) => updateField("intervention", "homeExercises", v)} theme={theme} />
              </>
            )}
            <FieldRow label="Next Review" value={d.nextReview} onEdit={(v) => updateField("intervention", "nextReview", v)} theme={theme} />
          </div>
        );
      }
      default:
        return null;
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
      {/* Top Bar with Back Button */}
      <div 
        className="flex items-center gap-3 px-6 py-4 flex-shrink-0 transition-colors duration-200"
        style={{ borderBottom: `1px solid ${theme.border}` }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 hover:opacity-70"
          style={{ backgroundColor: theme.surfaceSecondary, border: `1px solid ${theme.border}` }}
        >
          <ArrowLeft size={16} style={{ color: theme.text.secondary }} />
        </button>
        <span 
          className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] transition-colors duration-200"
          style={{ color: theme.text.secondary }}
        >
          Back to Patients
        </span>
      </div>

      {/* Patient Header */}
      <div className="flex flex-col items-center py-8 px-6 flex-shrink-0 relative">
        {/* Settings gear */}
        <button 
          className="absolute top-6 right-6 p-2 rounded-lg transition-all duration-200 hover:opacity-70"
          style={{ backgroundColor: theme.surfaceSecondary }}
        >
          <Settings size={16} style={{ color: theme.text.secondary }} />
        </button>

        {/* Avatar */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-200"
          style={{ 
            background: 'linear-gradient(135deg, #FF9E75 0%, #FF5A39 100%)',
          }}
        >
          <User size={32} className="text-white" />
        </div>

        {/* Name & Info */}
        <h1 
          className="font-['Inter',_sans-serif] font-semibold text-[20px] leading-[30px] transition-colors duration-200"
          style={{ color: theme.text.primary }}
        >
          {patient.name}
        </h1>
        <p 
          className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[20px] mt-1 transition-colors duration-200"
          style={{ color: theme.text.secondary }}
        >
          {patient.id} • {patient.age} years old{patient.grade ? ` • ${patient.grade}` : ""}
        </p>
      </div>

      {/* Tabs - pill/button style with fully rounded corners */}
      <div className="flex items-center gap-2 px-6 pb-4 flex-shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] whitespace-nowrap transition-all duration-200 flex-shrink-0"
            style={{
              ...(activeTab === tab.id
                ? {
                    background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                    color: '#FFFFFF',
                  }
                : {
                    backgroundColor: theme.surfaceSecondary,
                    color: theme.text.secondary,
                    border: `1px solid ${theme.border}`,
                  }),
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = theme.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = theme.surfaceSecondary;
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex-shrink-0" style={{ height: 1, backgroundColor: theme.border }} />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        {renderTabContent()}
      </div>
    </div>
  );
}
