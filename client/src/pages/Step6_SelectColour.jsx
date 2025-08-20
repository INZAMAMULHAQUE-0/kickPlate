import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from "lucide-react";

const Step6_SelectColour = () => {
  const navigate = useNavigate();
  const {
    kickplateData,
    allSets = [],
    selectedColour,
    setSelectedColour,
    stepStatus,
    setStepStatus
  } = useKickplate();

  // Extend color data with trimerate and supportrate
  const colorsData = [
    { thickness: '0.7 mm', leadTime: '2-3 Days', price: '75', available: true, color: 'bg-lime-500' },
    { thickness: '0.6 mm', leadTime: '2-3 Days', price: '55', available: false, color: 'bg-purple-200' },
    { thickness: '1.2 mm', leadTime: '2-15 Days', price: '55', available: true, color: 'bg-blue-600' },
    { thickness: '2 mm', leadTime: '2-15 Days', price: '95', available: true, color: 'bg-lime-500' },
    { thickness: '3 mm', leadTime: '2-15 Days', price: '65', available: true, color: 'bg-purple-600' },
    { thickness: '2.5 mm', leadTime: '7-9 weeks', price: '65', available: true, color: 'bg-blue-600' },
    { thickness: '3.5 mm', leadTime: '7-9 weeks', price: '55', available: false, color: 'bg-lime-100' },
    { thickness: '1.5 mm', leadTime: '7-9 weeks', price: '55', available: true, color: 'bg-purple-600' }
  ].map((color) => ({
    ...color,
    trimerate: Math.floor(Math.random() * 6) + 15, // 15–20
    supportrate: 13
  }));

  const handleSelect = (option) => {
    if (option.available) setSelectedColour(option);
  };

  const handlePreview = () => {
    if (selectedColour) {
      setStepStatus(prev => ({ ...prev, step6: true }));
      navigate('/order/step7');
    }
  };

  const handlePrevious = () => {
    navigate('/order/step5');
  };

  // All sets = [...allSets, currentSet]
  const completeSets = [...allSets, kickplateData];

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-6xl text-center mb-1 sm:mb-10">
        <div className="bg-indigo-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-indigo-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-extrabold">Step 6 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Select Colour</h1>
        <p className="text-black text-base sm:text-lg mt-2">Choose your preferred panel colour and specifications</p>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
        {/* Colour Options Section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-extrabold text-black mb-6">Available Colours & Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colorsData.map((color, idx) => (
                <motion.div
                  key={idx}
                  whileHover={color.available ? { scale: 1.02 } : {}}
                  whileTap={color.available ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(color)}
                  className={`cursor-pointer rounded-xl p-4 text-center shadow-md border-2 transition-all duration-300 relative focus:outline-none ${
                    color.available
                      ? `${color.color} text-white hover:shadow-lg border-transparent`
                      : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                  } ${
                    selectedColour?.thickness === color.thickness ? 'ring-4 ring-indigo-400 ring-offset-2' : ''
                  }`}
                >
                  {!color.available && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      N/A
                    </div>
                  )}
                  <div className="text-xl font-bold mb-2">{color.thickness}</div>
                  <div className="text-sm mb-1 opacity-90">
                    {color.leadTime}
                  </div>
                  <div className="text-base font-semibold mb-2">
                    AED {color.price}/sm
                  </div>
                  <div className="text-xs opacity-80 border-t border-white/30 pt-2">
                    Trim: AED {color.trimerate}/pc • Support: AED {color.supportrate}/pc
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Sets Summary Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-extrabold text-black mb-6">Panel Sets Summary</h3>
            <div className="space-y-4">
              {completeSets.map((set, index) => {
                const { cutLengthPieces = 0, trimLengthPieces = 0, supportLengthPieces = 0, cutLength, shedLength } = set;

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4"
                  >
                    <h4 className="text-indigo-700 font-extrabold mb-3 flex items-center justify-between">
                      <span>Panel Set {index + 1}</span>
                      <span className="text-xs bg-indigo-200 px-2 py-1 rounded-full font-bold">
                        {cutLength}×{shedLength}mm
                      </span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Cut Length (200mm)</span>
                        <span className="font-medium text-black">{cutLengthPieces} pcs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Trim (3m)</span>
                        <span className="font-medium text-black">{trimLengthPieces} pcs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Support (3m)</span>
                        <span className="font-medium text-black">{supportLengthPieces} pcs</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Colour Preview */}
            {selectedColour && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl"
              >
                <h4 className="text-indigo-700 font-extrabold mb-3">Selected Colour</h4>
                <div
                  className={`w-full h-16 ${selectedColour.color} text-white rounded-lg shadow-md flex items-center justify-center mb-3`}
                >
                  <span className="text-lg font-extrabold">{selectedColour.thickness}</span>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between mb-1">
                    <span>Lead Time:</span>
                    <span className="font-semibold">{selectedColour.leadTime}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Price:</span>
                    <span className="font-semibold">AED {selectedColour.price}/sm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trim/Support:</span>
                    <span className="font-semibold">AED {selectedColour.trimerate}/{selectedColour.supportrate}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-6xl mt-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrevious}
            className="w-full sm:flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 bg-white text-gray-800 font-extrabold shadow-md hover:shadow-lg transition-all duration-200 text-lg tracking-wide hover:border-indigo-400 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          <button
            onClick={handlePreview}
            disabled={!selectedColour}
            className={`w-full sm:flex-1 py-3 px-6 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-200 text-lg font-extrabold tracking-wide flex items-center justify-center gap-2 ${
              selectedColour
                ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700'
                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Preview Order <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6_SelectColour;
