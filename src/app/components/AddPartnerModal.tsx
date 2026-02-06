"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partnerData: any) => void;
}

export function AddPartnerModal({ isOpen, onClose, onSave }: AddPartnerModalProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    phoneNumber: "",
    companyName: "",
    address: "",
    orgNumber: "",
    vatNumber: "",
  });
  const [isCompany, setIsCompany] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      phoneNumber: "",
      companyName: "",
      address: "",
      orgNumber: "",
      vatNumber: "",
    });
    setIsCompany(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div 
        className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200"
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
                Add a Partner
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
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={16} style={{ color: theme.text.secondary }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* First Container - Always visible: Partner Information */}
          <div 
            className="rounded-lg p-6 flex flex-col gap-4 transition-colors duration-200"
            style={{ backgroundColor: theme.surfaceSecondary }}
          >
            <div className="flex items-center justify-between">
              <h3 
                className="font-['Inter',_sans-serif] font-medium text-[15px] leading-[22px] transition-colors duration-200"
                style={{ color: theme.text.primary }}
              >
                Partner Information:
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCompany}
                  onChange={(e) => setIsCompany(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    background: isCompany 
                      ? 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)' 
                      : 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)',
                    padding: isCompany ? '0' : '1px',
                  }}
                >
                  <div
                    className="w-full h-full rounded flex items-center justify-center"
                    style={{
                      background: isCompany 
                        ? 'transparent' 
                        : 'white',
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
                  The partner is a company.
                </span>
              </label>
            </div>

            {/* Form Fields Grid - First & Last Name, Email, Title, Phone number */}
            <div className="grid grid-cols-2 gap-4">
              {/* First & Last Name */}
              <div className="flex flex-col gap-2">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  First & Last Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
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
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-2">
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
                  className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Second Container - Only visible when checkbox is checked: Company Information */}
          {isCompany && (
            <div 
            className="rounded-lg p-6 flex flex-col gap-4 transition-colors duration-200"
            style={{ backgroundColor: theme.surfaceSecondary }}
          >
              <h3 
                className="font-['Inter',_sans-serif] font-medium text-[15px] leading-[22px] transition-colors duration-200"
                style={{ color: theme.text.primary }}
              >
                Company Information:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                  />
                </div>

                {/* Org. Number */}
                <div className="flex flex-col gap-2">
                  <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                    Org. Number
                  </label>
                  <input
                    type="text"
                    name="orgNumber"
                    value={formData.orgNumber}
                    onChange={handleChange}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                  />
                </div>

                {/* VAT. Number */}
                <div className="flex flex-col gap-2">
                  <label 
                  className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[24px] transition-colors duration-200"
                  style={{ color: theme.text.primary }}
                >
                    VAT. Number
                  </label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-colors duration-200"
                  style={{
                    backgroundColor: theme.input.background,
                    border: `1px solid ${theme.input.border}`,
                    color: theme.text.primary,
                  }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons - 50/50 split */}
          <div 
            className="flex items-center gap-3 mt-4 pt-6 border-t transition-colors duration-200"
            style={{ borderColor: theme.border }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
              style={{
                backgroundColor: theme.surfaceSecondary,
                color: theme.text.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.surfaceSecondary;
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
              }}
            >
              Save Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
