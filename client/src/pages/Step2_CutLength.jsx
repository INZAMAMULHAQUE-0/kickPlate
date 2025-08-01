import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useKickplate } from "../context/KickplateContext";
import { ArrowRight } from "lucide-react";

const Step2_CutLength = () => {
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
    const mm = parseFloat(kickplateData.cutLength);
    if (isNaN(mm)) return "";
    switch (selectedUnit) {
      case "cm": return (mm / 10).toFixed(1);
      case "meter": return (mm / 1000).toFixed(2);
      default: return mm.toString();
    }
  };

  useEffect(() => {
    if (kickplateData.cutLengthUnit) {
      setSelectedUnit(kickplateData.cutLengthUnit);
    }
  }, []);

  const handleLengthChange = (val) => {
    setInputValue(val);
    const converted = convertToMM(val, selectedUnit);
    setKickplateData({
      ...kickplateData,
      cutLength: converted.toString(),
      cutLengthUnit: selectedUnit,
    });
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    const formatted = displayFormattedValue();
    setInputValue(formatted);
    const converted = convertToMM(formatted, unit);
    setKickplateData({
      ...kickplateData,
      cutLength: converted.toString(),
      cutLengthUnit: unit,
    });
  };

  const cutLengthMM = parseFloat(kickplateData.cutLength);
  const isValidHeight = !isNaN(cutLengthMM) && cutLengthMM > 0;
  const valWithUnit = inputValue ? `${inputValue} ${selectedUnit}` : "";

  const handleNext = () => {
    if (!isValidHeight) return;
    setStepStatus({ ...stepStatus, step2: true });
    navigate("/order/step3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-10">
        <div className="bg-orange-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-orange-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-semibold">Step 2 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Cut Length</h1>
        <p className="text-black text-base sm:text-lg mt-2">Enter the cut length for your kickplate</p>
      </div>

      {/* Preview Section */}
      <div className="w-full max-w-3xl mb-6 sm:mb-8 bg-white/80 border-2 border-orange-100 rounded-2xl shadow-lg py-4 sm:py-8 px-3 sm:px-6">
          <div className="flex justify-center mb-4 sm:mb-8">
            <div className="w-full h-[200px] sm:h-[280px] p-2 sm:p-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isValidHeight ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-gray-500 w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 bg-gray-50/80"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-gray-400 rounded mb-2 sm:mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300"></div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-center">Enter dimensions to see preview</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col m-5 sm:m-10"
                  >
                    {/* Preview label */}
                    <div className="text-center mb-1">
                      <div className="inline-block bg-orange-50 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border border-orange-200">
                        Cut Length Preview
                      </div>
                    </div>

                    {/* Panel */}
                    <div className="flex-1 flex items-center justify-center relative">
                      {/* Arrow + measurement for mobile */}
                      <div className="absolute -left-3 sm:-left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">
                        <div className="text-xs sm:text-sm font-medium text-orange-700 font-bold whitespace-nowrap flex flex-col items-end">
                          <span>{inputValue}</span>
                          <span>{selectedUnit}</span>
                        </div>
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          className="flex items-center"
                        >
                          {/* Animated vertical arrow */}
                          <svg 
                            width="12" 
                            height="70" 
                            viewBox="0 0 16 100" 
                            fill="none"
                            className="sm:w-[16px] sm:h-[100px]"
                          >
                            <path d="M8 0 L0 8 L16 8 Z" fill="#F97316" />
                            <line x1="8" y1="8" x2="8" y2="92" stroke="#F97316" strokeWidth="2" />
                            <path d="M8 100 L0 92 L16 92 Z" fill="#F97316" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Box */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-[65%] sm:w-[70%] h-[50%] sm:h-[60%] mx-auto rounded overflow-hidden"
                      >
                        {/* Grey length borders */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] sm:h-[2px] bg-black"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] sm:h-[2px] bg-black"></div>
                        {/* Orange width borders */}
                        <div className="absolute top-0 bottom-0 left-0 w-[1px] sm:w-[2px] bg-orange-400"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-[1px] sm:w-[2px] bg-orange-400"></div>
                        {/* Grid background */}
                        <div
                          className="w-full h-full bg-orange-50/50 hidden sm:block"
                          style={{
                            backgroundImage:
                              'linear-gradient(0deg, rgba(255,166,77,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,166,77,0.15) 1px, transparent 1px)',
                            backgroundSize: '15px 15px'
                          }}
                        ></div>
                        {/* Mobile Grid background (smaller grid) */}
                        <div
                          className="w-full h-full bg-orange-50/50 block sm:hidden"
                          style={{
                            backgroundImage:
                              'linear-gradient(0deg, rgba(255,166,77,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,166,77,0.15) 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}
                        ></div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
          {/* Input */}
          <div style={{backgroundColor: 'rgb(255,255,255)'}} className="w-full max-w-3xl mx-auto border-2 border-orange-100 rounded-2xl shadow-lg p-6">
            <label className="block text-base font-semibold text-black mb-3">
              Cut Length
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <input
                type="number"
                min="0"
                placeholder="Enter length"
                value={inputValue}
                onChange={(e) => handleLengthChange(e.target.value)}
                className="w-full sm:flex-1 p-3 rounded-lg bg-white/80 border border-orange-100 text-black font-medium focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <select
                value={selectedUnit}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full sm:w-28 p-3 rounded-lg bg-white/80 border border-orange-100 text-black font-medium focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="meter">meter</option>
              </select>
            </div>
      <button
        onClick={handleNext}
        disabled={!isValidHeight}
        className={`w-full mt-6 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-300 text-lg font-bold tracking-wide flex items-center justify-center gap-2 ${
          isValidHeight
            ? "bg-white/80 border-orange-100 text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next <ArrowRight className="w-5 h-5" />
      </button>
          </div>


    </div>
  );
};

export default Step2_CutLength;
