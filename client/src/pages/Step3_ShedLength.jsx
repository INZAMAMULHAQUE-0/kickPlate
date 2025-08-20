import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useKickplate } from "../context/KickplateContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Step3_ShedLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();

  const [inputValue, setInputValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("mm");

  // Convert entered value to mm
  const convertToMM = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    switch (unit) {
      case "cm": return val * 10;
      case "meter": return val * 1000;
      default: return val;
    }
  };

  const displayFormattedValue = () => {
    const mm = parseFloat(kickplateData.shedLength);
    if (isNaN(mm)) return "";
    switch (selectedUnit) {
      case "cm": return (mm / 10).toFixed(1);
      case "meter": return (mm / 1000).toFixed(2);
      default: return mm.toString();
    }
  };

  useEffect(() => {
    if (kickplateData.shedLength && kickplateData.shedLengthUnit) {
      setSelectedUnit(kickplateData.shedLengthUnit);
      const formatted = displayFormattedValue();
      setInputValue(formatted);
    }
  }, []);

  const handleLengthChange = (val) => {
    setInputValue(val);
    const converted = convertToMM(val, selectedUnit);
    setKickplateData({
      ...kickplateData,
      shedLength: converted.toString(),
      shedLengthUnit: selectedUnit,
    });
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    const formatted = displayFormattedValue();
    setInputValue(formatted);
    const converted = convertToMM(formatted, unit);
    setKickplateData({
      ...kickplateData,
      shedLength: converted.toString(),
      shedLengthUnit: unit,
    });
  };

  const cutLengthMM = parseFloat(kickplateData.cutLength);
  const shedLengthMM = parseFloat(kickplateData.shedLength);
  const isValidCutLength = !isNaN(cutLengthMM) && cutLengthMM > 0;
  const isValidShedLength = !isNaN(shedLengthMM) && shedLengthMM > 0;
  const showPreview = isValidCutLength && isValidShedLength;

  const formatCutLengthDisplay = () => {
    const unit = kickplateData.cutLengthUnit || 'mm';
    if (!isValidCutLength) return 'Not Set';
    let value;
    switch (unit) {
      case 'cm':
        value = (cutLengthMM / 10).toFixed(1);
        break;
      case 'meter':
        value = (cutLengthMM / 1000).toFixed(2);
        break;
      default:
        value = cutLengthMM.toString();
    }
    // Remove trailing zeros and decimal if not needed
    value = value.replace(/\.0+$|(?<=\.[0-9]*)0+$/g, '');
    if (value.endsWith('.')) value = value.slice(0, -1);
    return `${value} ${unit}`;
  };

  const shedWithUnit = inputValue ? `${inputValue} ${selectedUnit}` : "";

  const handleNext = () => {
    if (!showPreview) return;
    setStepStatus({ ...stepStatus, step3: true });
    navigate("/order/step4");
  };

  const handlePrevious = () => {
    navigate("/order/step2");
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-10">
        <div className="bg-indigo-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-indigo-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-extrabold">Step 3 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Pergola Length</h1>
        <p className="text-black text-base sm:text-lg mt-2">Enter the Pergola Length for your kickplate</p>
      </div>

      {/* Preview Section */}
  <div className="w-full max-w-3xl mb-6 sm:mb-8 bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg py-6 sm:py-8 px-3 sm:px-6 ">
        <div className="flex justify-center mb-4 sm:mb-8">
          <div className="w-full h-[240px] sm:h-[320px] p-2 sm:p-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!showPreview ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-gray-500 w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50/80"
                >
                  <div className="w-14 h-14 border-2 border-gray-400 rounded mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300"></div>
                  </div>
                  <p className="text-sm font-medium text-center">Enter dimensions to see preview</p>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Preview label */}
                  <div className="text-center mb-4">
                    <div className="inline-block bg-indigo-50 px-4 py-1 rounded-full text-sm font-bold border border-indigo-200">
                      Panel Preview
                    </div>
                  </div>

                  {/* Panel with arrows */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Left cut length arrow */}
                    <div className="absolute -left-2 sm:-left-0.25 top-1/2 -translate-y-1/2 flex items-center sm:gap-2">
                      <div className="text-xs sm:text-sm font-extrabold text-indigo-700 flex flex-col items-start">
                        {/* Display value and unit on separate lines */}
                        <span>{formatCutLengthDisplay().split(' ')[0]}</span>
                        <span>{formatCutLengthDisplay().split(' ')[1]}</span>
                      </div>
                      <motion.div
                        animate={{ x: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="flex items-center"
                      >
                        {/* Animated vertical arrow */}
                        <svg width="12" height="80" viewBox="0 0 16 120" fill="none" className="sm:w-[16px] sm:h-[120px]">
                          <path d="M8 0 L0 8 L16 8 Z" fill="#111827" />
                          <line x1="8" y1="8" x2="8" y2="112" stroke="#111827" strokeWidth="2" />
                          <path d="M8 120 L0 112 L16 112 Z" fill="#111827" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Panel rectangle */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative w-[62%] h-[70%] mx-auto rounded overflow-hidden"
                    >
                      {/* Orange borders for cut length (top/bottom) */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-indigo-600"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600"></div>
                      {/* Gray borders for shed length (left/right) */}
                      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gray-800"></div>
                      <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gray-800"></div>
                      {/* Grid background */}
                      <div
                        className="w-full h-full bg-orange-50/50"
                        style={{
                          backgroundImage:
                            'linear-gradient(0deg, rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)',
                          backgroundSize: '15px 15px'
                        }}
                      ></div>
                    </motion.div>

                    {/* Bottom shed length arrow */}
<div className="absolute -bottom-8 sm:-bottom-13 left-1/2 -translate-x-1/2 flex flex-col items-center w-[60%]">
  <motion.div
    animate={{ y: [0, 4, 0] }}
    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    className="flex items-center w-full"
  >
    {/* Animated horizontal arrow that exactly matches panel width */}
    <svg
      viewBox="0 0 100 16"
      fill="none"
      className="w-full h-3 sm:h-4"
      preserveAspectRatio="none"
    >
      <path d="M0 8 L8 0 L8 16 Z" fill="#4F46E5" />
      <line x1="8" y1="8" x2="92" y2="8" stroke="#4F46E5" strokeWidth="2" />
      <path d="M100 8 L92 0 L92 16 Z" fill="#4F46E5" />
    </svg>
  </motion.div>
  <div className="text-xs sm:text-sm font-medium text-indigo-600 font-bold mt-1 flex flex-col sm:flex-row sm:items-center">
    {/* <span>Pergola Length:</span> */}
    <span className="mt-1 sm:mt-0 sm:ml-1 text-left w-full">{shedWithUnit}</span>
  </div>
</div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Input Section */}
  <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} className="w-full max-w-3xl mx-auto border-2 border-indigo-100 rounded-2xl shadow-lg p-6">
        <label className="block text-base font-semibold text-black mb-3">
            Pergola Length
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <input
            type="number"
            min="0"
            placeholder="Enter Pergola Length"
            value={inputValue}
            onChange={(e) => handleLengthChange(e.target.value)}
            className="w-full sm:flex-1 p-3 rounded-lg bg-white/80 border border-indigo-200 text-black font-semibold focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <select
            value={selectedUnit}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="w-full sm:w-28 p-3 rounded-lg bg-white/80 border border-indigo-200 text-black font-semibold focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          >
            <option value="mm">mm</option>
            <option value="cm">cm</option>
            <option value="meter">meter</option>
          </select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <button
            onClick={handlePrevious}
            className="w-full sm:flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 bg-white text-gray-800 font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-lg tracking-wide hover:border-indigo-400 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!showPreview}
            className={`w-full sm:flex-1 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-200 text-lg font-extrabold tracking-wide flex items-center justify-center gap-2 ${
              showPreview
                ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3_ShedLength;
