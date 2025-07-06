import React from 'react';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';

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

  // All sets = [...allSets, currentSet]
  const completeSets = [...allSets, kickplateData];

  return (
    <div className="min-h-screen bg-[#f5f5dc] px-6 pt-24 pb-10 text-[#5c4033]">
      {/* Title */}
      <h2 className="text-3xl font-bold text-purple-800 mb-10 text-center border-b pb-2">
        SELECT COLOUR
      </h2>

      {/* Grid and Summary */}
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
        {/* Colour Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {colorsData.map((color, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(color)}
              className={`cursor-pointer rounded-lg p-4 text-center shadow-md border transition relative focus:outline-none ${
                color.available
                  ? `${color.color} text-white hover:scale-105`
                  : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
              } ${
                selectedColour?.thickness === color.thickness ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              {!color.available && (
                <div className="absolute top-1 left-2 text-red-700 text-xs font-bold">NA</div>
              )}
              <div className="text-xl font-semibold">{color.thickness}</div>
              <div className="text-sm mt-2">
                {color.leadTime} - @ Dhs{color.price}/sm
              </div>
              <div className="text-xs mt-1">Trim: @Dhs{color.trimerate}/sm, Support: @Dhs{color.supportrate}/sm</div>
            </div>
          ))}
        </div>

        {/* Set Summary per panel set */}
        <div className="w-full max-w-xs space-y-6">
          {completeSets.map((set, index) => {
            const { cutLengthPieces = 0, trimLengthPieces = 0, supportLengthPieces = 0 } = set;
            const pricePerSM = selectedColour?.price || 0;
            const trimerate = selectedColour?.trimerate || 0;
            const supportrate = selectedColour?.supportrate || 0;


            return (
              <div key={index} className="bg-white border border-purple-300 shadow-md rounded p-4 text-sm">
                <h4 className="text-purple-700 font-bold mb-3">Panel Set {index + 1}</h4>
                <div className="flex justify-between mb-2">
                  <span>Cut Length (200 mm)</span>
                  <span>{cutLengthPieces} pcs</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Trim (3 m)</span>
                  <span>{trimLengthPieces} pcs</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Support (3 m)</span>
                  <span>{supportLengthPieces} pcs</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handlePreview}
          disabled={!selectedColour}
          className={`px-6 py-3 rounded shadow font-semibold transition ${
            selectedColour
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default Step6_SelectColour;
