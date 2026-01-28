"use client";
import { useState } from "react";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Search,
  LayoutDashboard,
  ClipboardList,
  Folder,
  Calendar,
  Users,
  BarChart3,
  FilePlus,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  CircleDot,
  Archive,
  Flag,
  Plus,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  Share2,
  CloudUpload,
  Bell,
  Shield,
  Plug,
  Star,
  Home,
  FolderOpen,
  ChevronLeft,
  ChevronUp,
  Blocks,
  TrendingUp,
  RotateCw,
} from "lucide-react";

// Softer spring animation curve
const softSpringEasing = "cubic-bezier(0.25, 1.1, 0.4, 1)";

function InterfacesLogo1() {
  return (
    <div
      className="aspect-[24/24] basis-0 grow min-h-px min-w-px overflow-clip relative shrink-0"
      data-name="Interfaces Logo"
    >
      <img
        src="/logo.svg"
        alt="Logo"
        width={24}
        height={24}
        className="w-full h-full"
      />
    </div>
  );
}


function Avatar() {
  return (
    <div
      className="bg-[#E5E5E5] relative rounded-[999px] shrink-0 size-8"
      data-name="Avatar"
    >
      <div className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative size-8">
        <User size={16} className="text-[#A1A1A1]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#E5E5E5] border-solid inset-0 pointer-events-none rounded-[999px]"
      />
    </div>
  );
}

function SearchContainer({
  isCollapsed = false,
  activeSection = "",
  searchValue = "",
  onSearchChange,
}: {
  isCollapsed?: boolean;
  activeSection?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}) {
  const { theme } = useTheme();

  // Define placeholder text based on active section
  const getPlaceholder = () => {
    switch (activeSection) {
      case "patients":
        return "Search for patient";
      case "tests":
        return "Search for tests";
      case "reports":
        return "Search for report ID, name...";
      case "automated-functions":
        return "Search for function";
      default:
        return "Search...";
    }
  };

  // Hide search for calendar section
  if (activeSection === "calendar") {
    return null;
  }

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
      data-name="Search Container"
    >
      <div
        className={`h-10 relative rounded-lg flex items-center transition-all duration-500 ${
          isCollapsed
            ? "w-10 min-w-10 justify-center"
            : "w-full"
        }`}
        style={{ 
          transitionTimingFunction: softSpringEasing,
          backgroundColor: theme.input.background,
          border: `1px solid ${theme.input.border}`,
        }}
      >
        <div
          className={`flex items-center justify-center shrink-0 transition-all duration-500 ${
            isCollapsed ? "p-1" : "px-1"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="size-8 flex items-center justify-center">
            <Search size={16} style={{ color: theme.text.secondary }} />
          </div>
        </div>
        <div
          className={`flex-1 min-h-px min-w-px relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex flex-col justify-center relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center pl-0 pr-2 py-1 relative w-full">
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] transition-colors duration-200"
                style={{
                  color: theme.text.secondary,
                }}
                tabIndex={isCollapsed ? -1 : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  children?: MenuItem[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarContent {
  title: string;
  sections: MenuSection[];
}

function MenuItem({
  item,
  isExpanded,
  onToggle,
  onItemClick,
  isCollapsed,
}: {
  item: MenuItem;
  isExpanded?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
  isCollapsed?: boolean;
}) {
  const { theme } = useTheme();
  
  const handleClick = () => {
    if (item.hasDropdown && onToggle) {
      onToggle();
    } else if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`select-none rounded-lg cursor-pointer transition-all duration-500 flex items-center relative my-0.5 ${
          item.isActive
            ? "bg-gradient-to-r from-[#FF5A39] to-[#FF9E75]"
            : ""
        } ${
          isCollapsed
            ? "w-10 min-w-10 h-10 justify-center p-4"
            : "w-full h-10 px-4 py-2"
        }`}
        style={{ 
          transitionTimingFunction: softSpringEasing,
          backgroundColor: !item.isActive ? 'transparent' : undefined,
        }}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
        onMouseEnter={(e) => {
          if (!item.isActive) {
            e.currentTarget.style.backgroundColor = theme.hover;
          }
        }}
        onMouseLeave={(e) => {
          if (!item.isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div className="flex items-center justify-center shrink-0">
          {React.isValidElement(item.icon) 
            ? React.cloneElement(item.icon as React.ReactElement<any>, {
                className: item.isActive ? 'text-[#FAFAFA]' : '',
                style: { 
                  color: item.isActive ? '#FAFAFA' : theme.text.secondary,
                  ...((item.icon as React.ReactElement<any>).props?.style || {}),
                },
              })
            : item.icon}
        </div>
        <div
          className={`flex-1 min-h-px min-w-px relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex flex-col justify-center relative size-full">
            <div 
              className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] truncate transition-colors duration-200"
              style={{ 
                color: item.isActive ? '#FAFAFA' : theme.text.secondary 
              }}
            >
              {item.label}
            </div>
          </div>
        </div>
        {item.hasDropdown && (
          <div
            className={`flex items-center justify-center shrink-0 transition-opacity duration-500 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"
            }`}
            style={{
              transitionTimingFunction: softSpringEasing,
            }}
          >
            <ChevronDown
              size={16}
              className="transition-transform duration-500"
              style={{
                transitionTimingFunction: softSpringEasing,
                transform: isExpanded
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                color: item.isActive ? '#FAFAFA' : theme.text.secondary,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SubMenuItem({
  item,
  onItemClick,
  isActive = false,
}: {
  item: MenuItem;
  onItemClick?: () => void;
  isActive?: boolean;
}) {
  const { theme } = useTheme();
  
  return (
    <div className="select-none w-full pl-9 pr-1 py-[1px]">
      <div
        className={`h-10 w-full rounded-lg cursor-pointer transition-colors flex items-center px-3 py-1 ${isActive ? 'bg-gradient-to-r from-[#FF5A39] to-[#FF9E75]' : ''}`}
        style={{
          backgroundColor: !isActive ? 'transparent' : undefined,
        }}
        onClick={onItemClick}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = theme.hover;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div className="flex-1 min-w-0">
          <div 
            className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[18px] truncate transition-colors duration-200"
            style={{ 
              color: isActive ? '#FAFAFA' : theme.text.secondary 
            }}
          >
            {item.label}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSection({
  section,
  expandedItems,
  onToggleExpanded,
  isCollapsed,
  onAddPatientClick,
  onAddPartnerClick,
  onAssessmentCategoryFilterChange,
  assessmentCategoryFilter,
}: {
  section: MenuSection;
  expandedItems: Set<string>;
  onToggleExpanded: (itemKey: string) => void;
  isCollapsed?: boolean;
  onAddPatientClick?: () => void;
  onAddPartnerClick?: () => void;
  onAssessmentCategoryFilterChange?: (category: string) => void;
  assessmentCategoryFilter?: string;
}) {
  const { theme } = useTheme();
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-stretch p-0 relative shrink-0 w-full">
      <div
        className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
          isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div className="flex flex-col justify-center relative size-full">
          <div className="box-border content-stretch flex flex-col h-10 items-start justify-center p-[16px] relative w-full">
            <div 
              className="font-['Inter',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-left text-nowrap transition-colors duration-200"
              style={{ color: theme.text.primary }}
            >
              <p className="block leading-[20px] whitespace-pre">
                {section.title}
              </p>
            </div>
          </div>
        </div>
      </div>
      {section.items.map((item, index) => {
        const itemKey = `${section.title}-${index}`;
        const isExpanded = expandedItems.has(itemKey);
        return (
          <div
            key={itemKey}
            className="w-full flex flex-col content-stretch"
          >
            <MenuItem
              item={item}
              isExpanded={isExpanded}
              onToggle={() => onToggleExpanded(itemKey)}
              onItemClick={() => {
                if (item.label === "Add Patient" && onAddPatientClick) {
                  onAddPatientClick();
                } else if (item.label === "Add Partner" && onAddPartnerClick) {
                  onAddPartnerClick();
                } else {
                  console.log(`Clicked ${item.label}`);
                }
              }}
              isCollapsed={isCollapsed}
            />
            {isExpanded && item.children && !isCollapsed && (
              <div className="flex flex-col gap-1 mb-2">
                {item.children.map((child, childIndex) => {
                  // Check if this is the active filter
                  const isActive = item.label === "Test Categories" 
                    ? child.label === assessmentCategoryFilter
                    : child.isActive || false;
                  
                  return (
                    <SubMenuItem
                      key={`${itemKey}-${childIndex}`}
                      item={child}
                      onItemClick={() => {
                        if (item.label === "Test Categories" && onAssessmentCategoryFilterChange) {
                          onAssessmentCategoryFilterChange(child.label);
                        } else {
                          console.log(`Clicked ${child.label}`);
                        }
                      }}
                      isActive={isActive}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getSidebarContent(
  activeSection: string,
  activeAutomatedFunctions?: any[],
): SidebarContent {
  const contentMap: Record<string, SidebarContent> = {
    patients: {
      title: "Patients",
      sections: [
        {
          title: "Overview",
          items: [
            {
              icon: (
                <Users size={16} className="text-[#FAFAFA]" />
              ),
              label: "My Patients",
              isActive: true,
            },
            {
              icon: (
                <Home
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "My Clinics",
            },
            {
              icon: (
                <Calendar
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "My Sessions",
            },
          ],
        },
        {
          title: "Patient Functions",
          items: [
            {
              icon: (
                <Plus size={16} className="text-[#A1A1A1]" />
              ),
              label: "Add Patient",
            },
            {
              icon: (
                <Settings
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Edit Patient",
            },
            {
              icon: (
                <Archive
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Remove Patient",
            },
            {
              icon: (
                <Filter size={16} className="text-[#A1A1A1]" />
              ),
              label: "Filters",
            },
          ],
        },
        {
          title: "Partner Functions",
          items: [
            {
              icon: (
                <Plus size={16} className="text-[#A1A1A1]" />
              ),
              label: "Add Partner",
            },
            {
              icon: (
                <Settings
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Register Partner Device",
            },
          ],
        },
      ],
    },
    tests: {
      title: "Assessments",
      sections: [
        {
          title: "Favourites",
          items: [
            {
              icon: (
                <Star
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Quick Vision Test",
            },
            {
              icon: (
                <Star
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Reading Assessment",
            },
            {
              icon: (
                <Star
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Eye Tracking Analysis",
            },
          ],
        },
        {
          title: "Recents",
          items: [
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Visual Processing Test",
            },
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Comprehensive Eye Exam",
            },
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Reading Speed Test",
            },
          ],
        },
        {
          title: "Filters",
          items: [
            {
              icon: (
                <Filter size={16} className="text-[#A1A1A1]" />
              ),
              label: "Test Categories",
              hasDropdown: true,
              children: [
                { label: "All tests", icon: <></> },
                { label: "Eye Tracking", icon: <></> },
                { label: "Reading", icon: <></> },
                { label: "Visual Processing", icon: <></> },
              ],
            },
            {
              icon: (
                <Filter size={16} className="text-[#A1A1A1]" />
              ),
              label: "Classes",
              hasDropdown: true,
              children: [
                { label: "A Gymnasium", icon: <></>, isActive: true },
                { label: "A Gymnasium", icon: <></> },
                { label: "B Gymnasium", icon: <></> },
                { label: "C Gymnasium", icon: <></> },
                { label: "D Gymnasium", icon: <></> },
                { label: "E Gymnasium", icon: <></> },
              ],
            },
          ],
        },
      ],
    },
    reports: {
      title: "Reports",
      sections: [
        {
          title: "Overview",
          items: [
            {
              icon: (
                <FileText size={16} className="text-[#A1A1A1]" />
              ),
              label: "All Reports",
              hasDropdown: true,
              children: [
                { label: "Patient Assessment - Jane Doe", icon: <></> },
                { label: "Vision Analysis - John Smith", icon: <></> },
                { label: "Reading Progress - Sarah Johnson", icon: <></> },
                { label: "Eye Tracking Results - Michael Brown", icon: <></> },
              ],
            },
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Recent Reports",
            },
            {
              icon: (
                <FilePlus
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Drafts",
              hasDropdown: true,
              children: [
                { label: "Untitled Report - 12/18/2025", icon: <></> },
                { label: "Quarterly Summary (Draft)", icon: <></> },
              ],
            },
          ],
        },
        {
          title: "Status",
          items: [
            {
              icon: (
                <CircleDot
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "In Progress",
            },
            {
              icon: (
                <CheckCircle2
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Completed",
            },
            {
              icon: (
                <Clock
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Pending Review",
            },
            {
              icon: (
                <Archive
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Archived",
            },
          ],
        },
        {
          title: "Functions",
          items: [
            {
              icon: (
                <Plus size={16} className="text-[#A1A1A1]" />
              ),
              label: "Create New Report",
            },
            {
              icon: (
                <Settings
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Edit Report",
            },
            {
              icon: (
                <Filter size={16} className="text-[#A1A1A1]" />
              ),
              label: "Filter Reports",
              hasDropdown: true,
              children: [
                { label: "By Patient", icon: <></> },
                { label: "By Date Range", icon: <></> },
                { label: "By Test Type", icon: <></> },
                { label: "By Clinician", icon: <></> },
              ],
            },
            {
              icon: (
                <Share2 size={16} className="text-[#A1A1A1]" />
              ),
              label: "Export Reports",
            },
          ],
        },
      ],
    },
    calendar: {
      title: "Calendar",
      sections: [
        {
          title: "Views",
          items: [
            {
              icon: (
                <Eye size={16} className="text-[#A1A1A1]" />
              ),
              label: "Month view",
            },
            {
              icon: (
                <Calendar
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Week view",
            },
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Day view",
            },
          ],
        },
        {
          title: "Events",
          items: [
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Today's events",
              hasDropdown: true,
              children: [
                { label: "Team standup (9:00 AM)", icon: <></> },
                { label: "Client call (2:00 PM)", icon: <></> },
                { label: "Project review (4:00 PM)", icon: <></> },
              ],
            },
            {
              icon: (
                <Calendar
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Upcoming events",
            },
          ],
        },
        {
          title: "Quick Actions",
          items: [
            {
              icon: (
                <Plus
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "New event",
            },
            {
              icon: (
                <Share2 size={16} className="text-[#A1A1A1]" />
              ),
              label: "Share calendar",
            },
          ],
        },
      ],
    },
    "automated-functions": {
      title: "Automated Functions",
      sections: [
        {
          title: "Status",
          items: [
            {
              icon: (
                <CheckCircle2 size={16} className="text-[#A1A1A1]" />
              ),
              label: "Active",
              hasDropdown: true,
              children: (activeAutomatedFunctions || []).map((func) => ({
                label: func.name,
                icon: <></>,
              })),
            },
            {
              icon: (
                <RotateCw size={16} className="text-[#A1A1A1]" />
              ),
              label: "Scheduled",
            },
          ],
        },
        {
          title: "Function Categories",
          items: [
            {
              icon: (
                <Users size={16} className="text-[#A1A1A1]" />
              ),
              label: "Patient Monitoring",
              hasDropdown: true,
              children: [
                { label: "Progress Tracking", icon: <></> },
                { label: "Anomaly Detection", icon: <></> },
                { label: "Attendance Monitoring", icon: <></> },
                { label: "Performance Alerts", icon: <></> },
              ],
            },
            {
              icon: (
                <FileText size={16} className="text-[#A1A1A1]" />
              ),
              label: "Report Automation",
              hasDropdown: true,
              children: [
                { label: "Daily Summary Generation", icon: <></> },
                { label: "Weekly Analysis Reports", icon: <></> },
                { label: "Monthly Clinic Statistics", icon: <></> },
                { label: "Patient Progress Reports", icon: <></> },
              ],
            },
            {
              icon: (
                <BarChart3 size={16} className="text-[#A1A1A1]" />
              ),
              label: "Data Processing",
              hasDropdown: true,
              children: [
                { label: "Test Results Analysis", icon: <></> },
                { label: "Trend Identification", icon: <></> },
                { label: "Data Synchronization", icon: <></> },
                { label: "Backup & Archive", icon: <></> },
              ],
            },
            {
              icon: (
                <Bell size={16} className="text-[#A1A1A1]" />
              ),
              label: "Alerts & Notifications",
              hasDropdown: true,
              children: [
                { label: "Appointment Reminders", icon: <></> },
                { label: "Test Due Notifications", icon: <></> },
                { label: "Critical Result Alerts", icon: <></> },
                { label: "Follow-up Reminders", icon: <></> },
              ],
            },
          ],
        },
        {
          title: "Management",
          items: [
            {
              icon: (
                <Settings size={16} className="text-[#A1A1A1]" />
              ),
              label: "Configure Settings",
            },
            {
              icon: (
                <TrendingUp size={16} className="text-[#A1A1A1]" />
              ),
              label: "View Logs",
            },
            {
              icon: (
                <Calendar size={16} className="text-[#A1A1A1]" />
              ),
              label: "Schedule Function",
            },
          ],
        },
      ],
    },
    calibrate: {
      title: "Calibrate",
      sections: [
        {
          title: "Calibration Tools",
          items: [
            {
              icon: (
                <RefreshCw size={16} className="text-[#A1A1A1]" />
              ),
              label: "System Calibration",
            },
            {
              icon: (
                <Settings
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Device Settings",
            },
            {
              icon: (
                <BarChart3
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Accuracy Test",
            },
          ],
        },
        {
          title: "History",
          items: [
            {
              icon: (
                <Clock size={16} className="text-[#A1A1A1]" />
              ),
              label: "Recent Calibrations",
              hasDropdown: true,
              children: [
                { label: "12/18/2025 - 10:30 AM", icon: <></> },
                { label: "12/15/2025 - 2:15 PM", icon: <></> },
                { label: "12/10/2025 - 9:45 AM", icon: <></> },
              ],
            },
          ],
        },
      ],
    },
    settings: {
      title: "Settings",
      sections: [
        {
          title: "Account",
          items: [
            {
              icon: (
                <User size={16} className="text-[#A1A1A1]" />
              ),
              label: "Profile settings",
            },
            {
              icon: (
                <Shield
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Security",
            },
            {
              icon: (
                <Bell
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Notifications",
            },
          ],
        },
        {
          title: "Workspace",
          items: [
            {
              icon: (
                <Settings
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Preferences",
              hasDropdown: true,
              children: [
                { label: "Theme settings", icon: <></> },
                { label: "Time zone", icon: <></> },
                { label: "Default notifications", icon: <></> },
              ],
            },
            {
              icon: (
                <Plug
                  size={16}
                  className="text-[#A1A1A1]"
                />
              ),
              label: "Integrations",
            },
          ],
        },
      ],
    },
  };

  return contentMap[activeSection] || contentMap.tests;
}

function IconNavButton({
  children,
  isActive = false,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative rounded-lg shrink-0 size-10 min-w-10 cursor-pointer transition-colors duration-500 ${
        isActive
          ? "bg-gradient-to-r from-[#FF5A39] to-[#FF9E75] text-white"
          : ""
      }`}
      style={{ 
        transitionTimingFunction: softSpringEasing,
        color: !isActive ? theme.text.secondary : undefined,
      }}
      data-name="Icon Nav Button"
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = theme.hover;
          e.currentTarget.style.color = theme.text.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = theme.text.secondary;
        }
      }}
    >
      {children}
    </div>
  );
}

function IconNavigation({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const { theme } = useTheme();
  const navItems = [
    {
      id: "patients",
      icon: <Users size={16} />,
      label: "Patients",
    },
    { id: "tests", icon: <ClipboardList size={16} />, label: "Tests" },
    {
      id: "reports",
      icon: <FileText size={16} />,
      label: "Reports",
    },
    {
      id: "calendar",
      icon: <Calendar size={16} />,
      label: "Calendar",
    },
    {
      id: "automated-functions",
      icon: <BarChart3 size={16} />,
      label: "Automated Functions",
    },
  ];

  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-full items-center justify-start overflow-clip p-4 relative rounded-l-2xl shrink-0 w-16 border-r transition-colors duration-200"
      style={{
        backgroundColor: theme.surface,
        borderRightColor: theme.border,
      }}
      data-name="Icon Navigation"
    >
      {/* Logo */}
      <div className="mb-2 size-10 flex items-center justify-center">
        <div className="size-7">
          <InterfacesLogo1 />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-2 w-full items-center">
        {navItems.map((item) => (
          <IconNavButton
            key={item.id}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          >
            {item.icon}
          </IconNavButton>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex-1" />
      <div className="flex flex-col gap-2 w-full items-center">
        <IconNavButton
          isActive={activeSection === "calibrate"}
          onClick={() => onSectionChange("calibrate")}
        >
          <Blocks size={16} className={activeSection === "calibrate" ? "text-white" : "text-[#FF5A39]"} />
        </IconNavButton>
        <IconNavButton
          isActive={activeSection === "settings"}
          onClick={() => onSectionChange("settings")}
        >
          <Settings size={16} />
        </IconNavButton>
        <div className="size-8">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  onToggleCollapse,
  isCollapsed,
}: {
  title: string;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
}) {
  const { theme } = useTheme();
  if (isCollapsed) {
    return (
      <div
        className="relative shrink-0 w-full flex justify-center transition-all duration-500"
        style={{ transitionTimingFunction: softSpringEasing }}
        data-name="Section Title Collapsed"
      >
        <button
          onClick={onToggleCollapse}
          className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative rounded-lg shrink-0 cursor-pointer transition-all duration-500 size-10 min-w-10"
          style={{ 
            transitionTimingFunction: softSpringEasing,
            color: theme.text.secondary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.hover;
            e.currentTarget.style.color = theme.text.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.text.secondary;
          }}
        >
          <ChevronLeft
            size={16}
            className="transition-transform duration-500"
            style={{
              transitionTimingFunction: softSpringEasing,
              transform: "rotate(180deg)",
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative shrink-0 w-full overflow-hidden transition-all duration-500"
      style={{ transitionTimingFunction: softSpringEasing }}
      data-name="Section Title"
    >
      <div className="flex flex-row items-center justify-between relative size-full">
        <div
          className="box-border content-stretch flex flex-row items-center justify-start relative overflow-hidden transition-opacity opacity-100 duration-500"
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center px-2 py-1 relative shrink-0">
            <div 
              className="font-['Inter',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[18px] text-left text-nowrap transition-colors duration-200"
              style={{ color: theme.text.primary }}
            >
              <p className="block leading-[27px] whitespace-pre">
                {title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pr-1">
          <button
            onClick={onToggleCollapse}
            className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative rounded-lg shrink-0 cursor-pointer transition-all duration-500 size-10 min-w-10"
            style={{
              transitionTimingFunction: softSpringEasing,
              color: theme.text.secondary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.hover;
              e.currentTarget.style.color = theme.text.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.text.secondary;
            }}
          >
            <ChevronLeft
              size={16}
              className="transition-transform duration-500"
              style={{
                transitionTimingFunction: softSpringEasing,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailSidebar({
  activeSection,
  onAddPatientClick,
  onAddPartnerClick,
  assessmentsPatient,
  onAssessmentCategoryFilterChange,
  assessmentCategoryFilter,
  searchValue,
  onSearchChange,
  activeAutomatedFunctions,
}: {
  activeSection: string;
  onAddPatientClick?: () => void;
  onAddPartnerClick?: () => void;
  assessmentsPatient?: { id: string; name: string; age: number; grade?: string; children?: number; lastTestDate: string; status: "ACTIVE" | "COMPLETED" } | null;
  onAssessmentCategoryFilterChange?: (category: string) => void;
  assessmentCategoryFilter?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeAutomatedFunctions?: any[];
}) {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<
    Set<string>
  >(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const content = getSidebarContent(activeSection, activeAutomatedFunctions);

  const toggleExpanded = (itemKey: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemKey)) {
      newExpanded.delete(itemKey);
    } else {
      newExpanded.add(itemKey);
    }
    setExpandedItems(newExpanded);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`box-border content-stretch flex flex-col gap-4 h-full items-start justify-start overflow-visible p-4 relative rounded-r-2xl shrink-0 transition-all duration-500 ${
        isCollapsed
          ? "w-16 min-w-16 !px-0 justify-center"
          : "w-64"
      }`}
      style={{ 
        transitionTimingFunction: softSpringEasing,
        backgroundColor: theme.surface,
      }}
      data-name="Detail Sidebar"
    >
      <SectionTitle
        title={content.title}
        onToggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
      />

      {/* Search Box - Show for patients, tests, reports, and automated-functions sections */}
      {(activeSection === "patients" || activeSection === "tests" || activeSection === "reports" || activeSection === "automated-functions") && !isCollapsed && (
        <div className="px-2">
          <SearchContainer
            isCollapsed={isCollapsed}
            activeSection={activeSection}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
        </div>
      )}

      <div
        className={`basis-0 box-border content-stretch flex flex-col grow min-h-px min-w-10 p-0 relative shrink-0 w-full overflow-y-auto transition-all duration-500 ${
          isCollapsed
            ? "gap-2 items-center justify-start"
            : "gap-4 items-start justify-start"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        {content.sections.map((section, index) => (
          <MenuSection
            key={`${activeSection}-${index}`}
            section={section}
            expandedItems={expandedItems}
            onToggleExpanded={toggleExpanded}
            isCollapsed={isCollapsed}
            onAddPatientClick={onAddPatientClick}
            onAddPartnerClick={onAddPartnerClick}
            onAssessmentCategoryFilterChange={onAssessmentCategoryFilterChange}
            assessmentCategoryFilter={assessmentCategoryFilter}
          />
        ))}
      </div>
    </div>
  );
}

export function TwoLevelSidebar({ 
  activeSection,
  onSectionChange,
  onAddPatientClick,
  onAddPartnerClick,
  assessmentsPatient,
  assessmentCategoryFilter,
  onAssessmentCategoryFilterChange,
  searchValue,
  onSearchChange,
  activeAutomatedFunctions,
}: { 
  activeSection: string;
  onSectionChange: (section: string) => void;
  onAddPatientClick?: () => void;
  onAddPartnerClick?: () => void;
  assessmentsPatient?: { id: string; name: string; age: number; grade?: string; children?: number; lastTestDate: string; status: "ACTIVE" | "COMPLETED" } | null;
  assessmentCategoryFilter?: string;
  onAssessmentCategoryFilterChange?: (category: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeAutomatedFunctions?: any[];
}) {
  const { theme } = useTheme();
  
  return (
    <div
      className="flex flex-row rounded-2xl overflow-hidden h-full transition-colors duration-200"
      style={{
        border: `1px solid ${theme.border}`,
      }}
      data-name="Two Level Sidebar"
    >
      <IconNavigation
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <DetailSidebar 
        activeSection={activeSection} 
        onAddPatientClick={onAddPatientClick}
        onAddPartnerClick={onAddPartnerClick}
        assessmentsPatient={assessmentsPatient}
        onAssessmentCategoryFilterChange={onAssessmentCategoryFilterChange}
        assessmentCategoryFilter={assessmentCategoryFilter}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        activeAutomatedFunctions={activeAutomatedFunctions}
      />
    </div>
  );
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("patients");
  return (
    <div className="bg-[#FAFAFA] box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative size-full min-h-screen">
      <TwoLevelSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
}