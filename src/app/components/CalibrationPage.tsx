"use client";

import { useState } from "react";
import { Plus, Monitor, Wifi, X, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Device {
  id: string;
  name: string;
  type: string;
  serial: string;
  status: "connected" | "disconnected";
  lastCalibrated: string | null;
  isCalibrating: boolean;
}

export function CalibrationPage() {
  const { theme } = useTheme();
  const [devices, setDevices] = useState<Device[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: "", type: "Eye Tracker", serial: "" });

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.serial) return;
    const device: Device = {
      id: Date.now().toString(),
      name: newDevice.name,
      type: newDevice.type,
      serial: newDevice.serial,
      status: "connected",
      lastCalibrated: null,
      isCalibrating: false,
    };
    setDevices([...devices, device]);
    setNewDevice({ name: "", type: "Eye Tracker", serial: "" });
    setShowAddModal(false);
  };

  const handleCalibrate = (deviceId: string) => {
    setDevices(prev =>
      prev.map(d => d.id === deviceId ? { ...d, isCalibrating: true } : d)
    );
    // Mock calibration
    setTimeout(() => {
      setDevices(prev =>
        prev.map(d =>
          d.id === deviceId
            ? { ...d, isCalibrating: false, lastCalibrated: new Date().toLocaleDateString() }
            : d
        )
      );
    }, 2500);
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
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
      <div 
        className="flex items-center justify-between px-6 py-5 flex-shrink-0 transition-colors duration-200"
        style={{ borderBottom: `1px solid ${theme.border}` }}
      >
        <div>
          <h1 
            className="font-['Inter',_sans-serif] font-semibold text-[20px] leading-[30px] transition-colors duration-200"
            style={{ color: theme.text.primary }}
          >
            Calibration
          </h1>
          <p 
            className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[20px] mt-0.5 transition-colors duration-200"
            style={{ color: theme.text.secondary }}
          >
            Manage and calibrate your connected devices.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] hover:opacity-90 transition-all duration-200"
          style={{ background: 'linear-gradient(90deg, #FF5A39 0%, #FF9E75 100%)' }}
        >
          <Plus size={16} />
          Add a Device
        </button>
      </div>

      {/* Device List */}
      <div className="flex-1 overflow-y-auto p-6">
        {devices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: theme.surfaceSecondary }}
            >
              <Monitor size={28} style={{ color: theme.text.disabled }} />
            </div>
            <p 
              className="font-['Inter',_sans-serif] font-normal text-[14px] leading-[20px] text-center transition-colors duration-200"
              style={{ color: theme.text.secondary }}
            >
              No devices added yet.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-all duration-200"
              style={{ backgroundColor: theme.surfaceSecondary, color: theme.text.primary, border: `1px solid ${theme.border}` }}
            >
              <Plus size={14} />
              Add your first device
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 relative group"
                style={{
                  backgroundColor: theme.surfaceSecondary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveDevice(device.id)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50"
                  style={{ color: theme.text.disabled }}
                >
                  <X size={14} />
                </button>

                {/* Device icon & status */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ 
                      background: device.isCalibrating 
                        ? 'linear-gradient(135deg, #FF9E75 0%, #FF5A39 100%)' 
                        : theme.surface 
                    }}
                  >
                    <Monitor size={18} style={{ color: device.isCalibrating ? '#fff' : theme.text.secondary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p 
                      className="font-['Inter',_sans-serif] font-medium text-[14px] leading-[20px] truncate transition-colors duration-200"
                      style={{ color: theme.text.primary }}
                    >
                      {device.name}
                    </p>
                    <p 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      {device.type}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      Serial
                    </span>
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.primary }}
                    >
                      {device.serial}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      Status
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: device.status === "connected" ? "#22C55E" : "#EF4444" }}
                      />
                      <span 
                        className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] capitalize transition-colors duration-200"
                        style={{ color: device.status === "connected" ? "#22C55E" : "#EF4444" }}
                      >
                        {device.status}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: theme.text.secondary }}
                    >
                      Last Calibrated
                    </span>
                    <span 
                      className="font-['Inter',_sans-serif] font-normal text-[12px] leading-[18px] transition-colors duration-200"
                      style={{ color: device.lastCalibrated ? theme.text.primary : theme.text.disabled }}
                    >
                      {device.lastCalibrated || "Never"}
                    </span>
                  </div>
                </div>

                {/* Calibrate Button */}
                <button
                  onClick={() => handleCalibrate(device.id)}
                  disabled={device.isCalibrating}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] hover:opacity-90 transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    background: device.isCalibrating
                      ? 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)'
                      : 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
                    opacity: device.isCalibrating ? 0.7 : 1,
                  }}
                >
                  {device.isCalibrating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calibrating...
                    </>
                  ) : (
                    <>
                      <Zap size={14} />
                      Calibrate
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div 
            className="rounded-2xl w-full max-w-md transition-colors duration-200"
            style={{ backgroundColor: theme.surface }}
          >
            {/* Modal Header */}
            <div 
              className="flex items-center justify-between px-6 py-5 transition-colors duration-200"
              style={{ borderBottom: `1px solid ${theme.border}` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: theme.surfaceSecondary }}
                >
                  <Monitor size={18} style={{ color: theme.text.secondary }} />
                </div>
                <div>
                  <h2 
                    className="font-['Inter',_sans-serif] font-semibold text-[16px] leading-[24px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Add a Device
                  </h2>
                  <p 
                    className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
                    style={{ color: theme.text.secondary }}
                  >
                    Enter device information.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-black/5"
              >
                <X size={16} style={{ color: theme.text.secondary }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4">
              <div 
                className="rounded-lg p-5 flex flex-col gap-4 transition-colors duration-200"
                style={{ backgroundColor: theme.surfaceSecondary }}
              >
                {/* Device Name */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Device Name
                  </label>
                  <input
                    type="text"
                    value={newDevice.name}
                    onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                    placeholder="e.g. Office Eye Tracker"
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>

                {/* Device Type */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Device Type
                  </label>
                  <select
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200 appearance-none"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  >
                    <option value="Eye Tracker">Eye Tracker</option>
                    <option value="Hearing Device">Hearing Device</option>
                    <option value="Vision Screener">Vision Screener</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Serial Number */}
                <div className="flex flex-col gap-1.5">
                  <label 
                    className="font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-colors duration-200"
                    style={{ color: theme.text.primary }}
                  >
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={newDevice.serial}
                    onChange={(e) => setNewDevice({ ...newDevice, serial: e.target.value })}
                    placeholder="e.g. SN-12345-AB"
                    className="h-9 px-4 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] focus:outline-none focus:ring-2 focus:ring-[#FF5A39]/20 transition-all duration-200"
                    style={{
                      backgroundColor: theme.input.background,
                      border: `1px solid ${theme.input.border}`,
                      color: theme.text.primary,
                    }}
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div 
                className="flex items-center gap-3 pt-2"
              >
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2 rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: theme.surfaceSecondary,
                    color: theme.text.primary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDevice}
                  disabled={!newDevice.name || !newDevice.serial}
                  className="flex-1 px-6 py-2 text-white rounded-lg font-['Inter',_sans-serif] font-normal text-[13px] leading-[18px] hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(90deg, #A86CCF 0%, #6B488D 100%)',
                  }}
                >
                  Add Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
