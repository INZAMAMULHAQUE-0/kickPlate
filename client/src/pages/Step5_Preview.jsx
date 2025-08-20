import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

const PreviewPage = () => {
  const { kickplateData, addNewSet, stepStatus, setStepStatus } = useKickplate();
  const navigate = useNavigate();

  const {
    cutLength,
    shedLength,
    cutLengthPieces,
    trimLengthPieces,
    supportLengthPieces,
    zLines
  } = kickplateData;

  const x = parseFloat(cutLength) || 0;
  const y = parseFloat(shedLength) || 0;

  const formatValue = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return '—';
    
    // Format to remove trailing zeros
    const formatNumber = (num) => {
      const formatted = num.toFixed(1);
      return formatted.replace(/\.0$/, '');
    };
    
    switch (unit) {
      case 'cm': return `${formatNumber(val / 10)} cm`;
      case 'meter': return `${formatNumber(val / 1000)} m`;
      default: return `${formatNumber(val)} mm`;
    }
  };

  const formattedCutLength = formatValue(kickplateData.cutLength, kickplateData.cutLengthUnit);
  const formattedShedLength = formatValue(kickplateData.shedLength, kickplateData.shedLengthUnit);

  const hasValidDimensions = x > 0 && y > 0;

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-1 sm:mb-10">
        <div className="bg-indigo-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-indigo-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-extrabold">Step 5 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Final Preview</h1>
        <p className="text-black text-base sm:text-lg mt-2">Review your panel configuration before proceeding</p>
      </div>

      {/* Preview Section */}
  <div className="w-full max-w-3xl mb-8 bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg py-4 px-2 sm:px-8">
        <div className="flex justify-center mb-8">
          <div className="w-full h-[280px] p-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!hasValidDimensions ? (
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
                  <p className="text-sm font-medium text-center">Panel preview will appear here</p>
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
                      Final Panel Configuration
                    </div>
                  </div>

                  {/* Panel with arrows */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Left cut length arrow */}
                    <div className="absolute -left-6 sm:-left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <div className="text-xs sm:text-sm font-medium text-orange-700 font-bold whitespace-nowrap">
                        <span className="hidden sm:inline">Cut Length:</span>
                        <span className="sm:hidden underline pb-1">Cut Length:</span>
                        <br className="sm:hidden"/>
                        {formattedCutLength}
                      </div>
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="flex items-center"
                      >
                        {/* Animated vertical arrow */}
                        <svg width="12" height="80" viewBox="0 0 16 100" fill="none" className="sm:w-4 sm:h-[100px]">
                          <path d="M8 0 L0 8 L16 8 Z" fill="#4f46e5" />
                          <line x1="8" y1="8" x2="8" y2="92" stroke="#4f46e5" strokeWidth="2" />
                          <path d="M8 100 L0 92 L16 92 Z" fill="#4f46e5" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Panel rectangle - consistent size with Step4 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative w-[55%] sm:w-[50%] h-[35%] sm:h-[55%] mx-auto rounded overflow-hidden"
                    >
                      {/* Orange borders for cut length (top/bottom) */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] sm:h-[3px] bg-indigo-600"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] sm:h-[3px] bg-indigo-600"></div>
                      {/* Gray borders for shed length (left/right) */}
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] sm:w-[3px] bg-gray-800"></div>
                      <div className="absolute top-0 bottom-0 right-0 w-[2px] sm:w-[3px] bg-gray-800"></div>
                      {/* Grid background with Z lines */}
                      <div
                        className="w-full h-full bg-white"
                        style={{
                          backgroundImage: (() => {
                            const numLines = Math.max(1, zLines || 1);
                            const positions = Array.from({ length: numLines }, (_, i) => {
                              const position = (100 / (numLines * 2)) * (1 + i * 2);
                              return `rgba(99, 102, 241, 0.6) ${position}%, transparent ${position}%`;
                            });
                            return `linear-gradient(0deg, transparent 0, ${positions.join(', ')})`;
                          })(),
                          backgroundSize: '100% 100%',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </motion.div>

                    {/* Bottom pergola length arrow */}
                    <div className="absolute bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center w-[50%] sm:w-[44%]">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="flex items-center w-full"
                      >
                        {/* Animated horizontal arrow that exactly matches panel width */}
                        <svg
                          viewBox="0 0 100 16"
                          fill="none"
                          className="w-full h-2 sm:h-3"
                          preserveAspectRatio="none"
                        >
                          <path d="M0 8 L8 0 L8 16 Z" fill="#4f46e5" />
                          <line x1="8" y1="8" x2="92" y2="8" stroke="#4f46e5" strokeWidth="2" />
                          <path d="M100 8 L92 0 L92 16 Z" fill="#4f46e5" />
                        </svg>
                      </motion.div>
                      <div className="text-xs sm:text-sm font-medium text-orange-700 font-bold whitespace-nowrap mt-1">
                        <span className="hidden sm:inline">Pergola Length: </span>
                        <span className="sm:hidden underline">Pergola Length:<br /></span>
                        {formattedShedLength}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cut, Trim, Support Fields */}
  <div className="w-full max-w-3xl mx-auto border-2 border-indigo-100 rounded-2xl shadow-lg p-6 mb-8" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <h3 className="text-lg font-semibold text-black mb-4">Material Requirements</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Cut Length (200 mm)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={cutLengthPieces}
                disabled
        className="border border-indigo-200 rounded-lg px-4 py-2 w-24 text-right bg-gray-50 text-gray-800 cursor-not-allowed font-semibold"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Trim (3 m)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={trimLengthPieces}
                disabled
        className="border border-indigo-200 rounded-lg px-4 py-2 w-24 text-right bg-gray-50 text-gray-800 cursor-not-allowed font-semibold"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Support (3 m)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={supportLengthPieces}
                disabled
        className="border border-indigo-200 rounded-lg px-4 py-2 w-24 text-right bg-gray-50 text-gray-800 cursor-not-allowed font-semibold"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => navigate('/order/step4')}
            className="w-full sm:w-1/3 py-3 px-6 rounded-xl border-2 border-gray-300 bg-white text-gray-800 font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-lg tracking-wide hover:border-indigo-400 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={() => {
              addNewSet();
              navigate('/order/step2')
            }}
            className="w-full sm:w-1/3 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-200 text-lg font-extrabold tracking-wide bg-white border-indigo-100 text-gray-900 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add More Sizes
          </button>
          <button
            onClick={() => {
              setStepStatus(prev => ({ ...prev, step5: true }));
              navigate('/order/step6');
            }}
            className="w-full sm:w-1/3 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-200 text-lg font-extrabold tracking-wide bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 flex items-center justify-center gap-2"
          >
            Next: Choose Colour
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;