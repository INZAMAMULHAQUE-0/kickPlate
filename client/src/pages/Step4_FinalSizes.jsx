import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step4_FinalSizes = () => {
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [localValues, setLocalValues] = useState({
    cutLengthPieces: '',
    trimLengthPieces: '',
    zLines: '',
    supportLengthPieces: ''
  });

  const x = parseFloat(kickplateData.cutLength) || 0;
  const y = parseFloat(kickplateData.shedLength) || 0;

  const xMeters = x / 1000;
  const yMeters = y / 1000;

  const calculatedCutLengthPieces = Math.ceil(yMeters / 0.2);
  const calculatedTrimPieces = Math.ceil(((x + y) / 1000) * 2 / 3 + 1);
  const zLines = Math.max(1, Math.round(xMeters / 1.5)); // Ensure z is at least 1
  const calculatedSupportPieces = Math.ceil(zLines * (yMeters / 3));

  useEffect(() => {
    // Get current zLines value (use the one from state if available, otherwise calculated)
    const currentZLines = localValues.zLines || zLines;
    
    // Calculate support pieces based on current zLines
    const supportPieces = Math.ceil(currentZLines * (yMeters / 3));
    
    const updatedValues = {
      cutLengthPieces: calculatedCutLengthPieces,
      trimLengthPieces: calculatedTrimPieces,
      zLines: currentZLines,
      supportLengthPieces: supportPieces
    };

    setKickplateData(prev => ({ ...prev, ...updatedValues }));

    setLocalValues(prev => ({
      cutLengthPieces: prev.cutLengthPieces || updatedValues.cutLengthPieces,
      trimLengthPieces: prev.trimLengthPieces || updatedValues.trimLengthPieces,
      zLines: prev.zLines || updatedValues.zLines,
      supportLengthPieces: supportPieces // Always update support pieces based on current zLines
    }));
  }, [x, y]);

  const handleEditToggle = () => setIsEditable(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If changing zLines, ensure it's not less than 1
    if (name === 'zLines') {
      const numValue = parseInt(value, 10);
      const validValue = isNaN(numValue) ? 1 : Math.max(1, numValue);
      
      // Calculate new support pieces based on zLines change
      const newSupportPieces = Math.ceil(validValue * (yMeters / 3));
      
      // Update both zLines and supportLengthPieces in local state
      setLocalValues(prev => ({ 
        ...prev, 
        [name]: validValue,
        supportLengthPieces: newSupportPieces
      }));
      
      // Update both in context
      setKickplateData(prev => ({ 
        ...prev, 
        [name]: validValue,
        supportLengthPieces: newSupportPieces
      }));
      return;
    }
    
    // For other fields
    setLocalValues(prev => ({ ...prev, [name]: value }));
    setKickplateData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    setStepStatus(prev => ({ ...prev, step4: true }));
    navigate('/order/step5');
  };

  const formatValue = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return '—';
    switch (unit) {
      case 'cm': return `${(val / 10).toFixed(1)} cm`;
      case 'meter': return `${(val / 1000).toFixed(2)} m`;
      default: return `${val.toFixed(0)} mm`;
    }
  };

  const formattedCutLength = formatValue(kickplateData.cutLength, kickplateData.cutLengthUnit);
  const formattedShedLength = formatValue(kickplateData.shedLength, kickplateData.shedLengthUnit);

  const hasValidDimensions = x > 0 && y > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-1 sm:mb-10">
        <div className="bg-orange-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-orange-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-semibold">Step 4 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Final Sizes</h1>
        <p className="text-black text-base sm:text-lg mt-2">Review panel dimensions and piece calculations</p>
      </div>

      {/* Preview Section */}
      <div className="w-full max-w-3xl mb-8 bg-white/80 border-2 border-orange-100 rounded-2xl shadow-lg py-4 px-2 sm:px-8 ">
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
                    <div className="inline-block bg-orange-50 px-4 py-1 rounded-full text-sm font-medium border border-orange-200">
                      Final Panel Preview
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
                          <path d="M8 0 L0 8 L16 8 Z" fill="#F97316" />
                          <line x1="8" y1="8" x2="8" y2="92" stroke="#F97316" strokeWidth="2" />
                          <path d="M8 100 L0 92 L16 92 Z" fill="#F97316" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Panel rectangle - smaller size for Final Sizes */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative w-[55%] sm:w-[50%] h-[35%] sm:h-[55%] mx-auto rounded overflow-hidden"
                    >
                      {/* Orange borders for cut length (top/bottom) */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] sm:h-[3px] bg-orange-400"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] sm:h-[3px] bg-orange-400"></div>
                      {/* Gray borders for shed length (left/right) */}
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] sm:w-[3px] bg-orange-600"></div>
                      <div className="absolute top-0 bottom-0 right-0 w-[2px] sm:w-[3px] bg-orange-600"></div>
                      {/* Grid background */}
                      <div
                        className="w-full h-full bg-white"
                        style={{
                          backgroundImage: (() => {
                            const numLines = Math.max(1, localValues.zLines || zLines);
                            const positions = Array.from({ length: numLines }, (_, i) => {
                              const position = (100 / (numLines * 2)) * (1 + i * 2);
                              return `rgba(255, 166, 77, 0.6) ${position}%, transparent ${position}%`;
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
                          <path d="M0 8 L8 0 L8 16 Z" fill="#ff8904" />
                          <line x1="8" y1="8" x2="92" y2="8" stroke="#ff8904" strokeWidth="2" />
                          <path d="M100 8 L92 0 L92 16 Z" fill="#ff8904" />
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

      {/* Inputs Section */}
      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} className="w-full max-w-3xl mx-auto border-2 border-orange-100 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Calculated Pieces</h3>
          {isEditable && (
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 border border-orange-200">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
                Editing Mode
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {/* Cut Length field */}
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Cut Length (200 mm)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="cutLengthPieces"
                value={localValues.cutLengthPieces}
                onChange={handleChange}
                disabled={!isEditable}
                className="border border-orange-100 rounded-lg px-4 py-2 w-24 text-right bg-white/80 disabled:bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 font-medium"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
          
          {/* Trim field */}
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Trim (3 m)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="trimLengthPieces"
                value={localValues.trimLengthPieces}
                onChange={handleChange}
                disabled={!isEditable}
                className="border border-orange-100 rounded-lg px-4 py-2 w-24 text-right bg-white/80 disabled:bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 font-medium"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
          
          {/* Z-Lines field (new) */}
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-black">Z Value</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="zLines"
                min="1"
                value={localValues.zLines}
                onChange={handleChange}
                disabled={!isEditable}
                className="border border-orange-100 rounded-lg px-4 py-2 w-24 text-right bg-white/80 disabled:bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 font-medium"
              />
              <span className="text-sm text-black font-medium w-12">Piece</span>
            </div>
          </div>
          
          {/* Support field (always uneditable) */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <label className="text-base font-medium text-black">Support (3 m)</label>
              <div className="ml-2 relative group">
                <div className="w-4 h-4 bg-gray-200 rounded-full text-xs flex items-center justify-center cursor-help text-gray-500">?</div>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs p-2 rounded w-40 text-center">
                  Auto-calculated based on dimensions and support lines
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="supportLengthPieces"
                value={localValues.supportLengthPieces}
                disabled={true}
                className="border border-gray-200 rounded-lg px-4 py-2 w-24 text-right bg-gray-50 text-gray-700 cursor-not-allowed"
              />
              <span className="text-sm text-black font-medium w-12">pieces</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEditToggle}
            className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wide ${
              isEditable 
                ? "bg-orange-400 border-orange-400 text-white hover:bg-orange-500 hover:border-orange-500" 
                : "bg-white border-gray-300 text-gray-700 hover:border-orange-400"
            }`}
          >
            {isEditable ? 'Lock Value' : 'Edit'}
          </button>
          <button
            onClick={handlePreview}
            className={`flex-1 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-300 text-lg font-bold tracking-wide ${
              hasValidDimensions
                ? "bg-white/80 border-orange-100 text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!hasValidDimensions}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4_FinalSizes;
