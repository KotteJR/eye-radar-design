"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patientData: any) => void;
}

export function AddPatientModal({ isOpen, onClose, onSave }: AddPatientModalProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    nativeLanguage: "",
  });
  const [isAdultPatient, setIsAdultPatient] = useState(false);
  const [children, setChildren] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, children });
    onClose();
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      nativeLanguage: "",
    });
    setIsAdultPatient(false);
    setChildren([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChild = () => {
    setChildren([...children, {
      firstName: "",
      lastName: "",
      birthDate: "",
      nativeLanguage: "",
      class: "",
    }]);
  };

  const handleChildChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newChildren = [...children];
    newChildren[index] = {
      ...newChildren[index],
      [e.target.name]: e.target.value,
    };
    setChildren(newChildren);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 transition-opacity duration-300"
    >
      <div 
        className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform"
        style={{ backgroundColor: theme.surface }}
      >
        {/* Header */}
        <div 
          className="flex items-start justify-between p-6 border-b transition-colors duration-200"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: theme.surfaceSecondary }}
            >
              <User size={20} style={{ color: theme.text.secondary }} />
            </div>
            <div>
              <h2 
                className="font-['Inter',_sans-serif] font-semibold text-[18px] leading-[27px] transition-colors duration-200"
                style={{ color: theme.text.primary }}
              >
                Add a Patient
              </h2>
              <p 
                className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] mt-1 transition-colors duration-200"
                style={{ color: theme.text.secondary }}
              >
                Fill in user information.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-black/5"
            style={{ backgroundColor: 'transparent' }}
          >
            <X size={16} style={{ color: theme.text.secondary }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Adult/Guardian Container - Expands when checkbox is checked */}
          <div 
            className="rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-out"
            style={{ backgroundColor: theme.surfaceSecondary }}
          >
            <div className="flex items-center justify-between">
              <h3 
                className="font-['Inter',_sans-serif] font-medium text-[15px] leading-[22px] transition-colors duration-200"
                style={{ color: theme.text.primary }}
              >
                Adult / Guardian information:
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdultPatient}
                  onChange={(e) => setIsAdultPatient(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                    padding: isAdultPatient ? '0' : '1px',
                  }}
                >
                  <div
                    className="w-full h-full rounded flex items-center justify-center transition-all duration-200"
                    style={{
                      background: isAdultPatient ? 'transparent' : 'white',
                    }}
                  >
                  </div>
                </div>
                <span 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px]"
                  style={{
                    background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  The adult is the patient.
                </span>
              </label>
            </div>

            {/* Form Fields Grid - First Name, Last Name, Email, Phone number */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>
            </div>

            {/* Patient Information - Expands smoothly within the same box */}
            <div 
              className={`grid grid-cols-2 gap-4 overflow-hidden transition-all duration-400 ease-out ${
                isAdultPatient ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              {/* Divider */}
              <div 
                className="col-span-2 h-px transition-colors duration-200"
                style={{ backgroundColor: theme.border }}
              />
              
              {/* Birth Date */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Native Language */}
              <div className="flex flex-col gap-1.5">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Native Language
                </label>
                <input
                  type="text"
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Child Containers - Animate in smoothly */}
          {children.map((child, index) => (
            <div 
              key={index} 
              className="rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2 relative"
              style={{ backgroundColor: theme.surfaceSecondary }}
            >
              <div className="flex items-center justify-between">
                <h3 
                  className="font-['Inter',_sans-serif] font-medium text-[15px] leading-[22px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Child {index + 1} Information:
                </h3>
                <button
                  type="button"
                  onClick={() => setChildren(children.filter((_, i) => i !== index))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-red-50"
                >
                  <X size={14} style={{ color: theme.text.disabled }} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={child.firstName || ""}
                    onChange={(e) => handleChildChange(index, e)}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={child.lastName || ""}
                    onChange={(e) => handleChildChange(index, e)}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
                {/* Birth Date */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Birth Date
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={child.birthDate || ""}
                    onChange={(e) => handleChildChange(index, e)}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
                {/* Native Language */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Native Language
                  </label>
                  <input
                    type="text"
                    name="nativeLanguage"
                    value={child.nativeLanguage || ""}
                    onChange={(e) => handleChildChange(index, e)}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
                {/* Class - Full Width */}
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Class
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={child.class || ""}
                    onChange={(e) => handleChildChange(index, e)}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add a child link */}
          <button
            type="button"
            onClick={handleAddChild}
            className="text-left font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] bg-gradient-to-r from-[#FF5A39] to-[#FF9E75] text-transparent bg-clip-text hover:opacity-80 transition-all duration-200"
          >
            Add a child...
          </button>

          {/* Footer Buttons - 50/50 split */}
          <div 
            className="flex items-center gap-3 mt-4 pt-6 border-t transition-colors duration-200"
            style={{ borderColor: theme.border }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: theme.surfaceSecondary,
                color: theme.text.primary,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] hover:opacity-90 transition-all duration-200"
              style={{
                background: 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
              }}
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
