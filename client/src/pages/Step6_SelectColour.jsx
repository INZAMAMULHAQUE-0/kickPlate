import React from 'react';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';

const Step6_SelectColour = () => {
  const navigate = useNavigate();

  const {
    kickplateData,
    setKickplateData,
    allSets = [],
    selectedColour,
    setSelectedColour,
    stepStatus, setStepStatus
  } = useKickplate();

  const colorsData = [
    //{ thickness: '0.6 mm', leadTime: '2-3 Days', price: '55', available: true, color: 'bg-blue-600' },
    { thickness: '0.7 mm', leadTime: '2-3 Days', price: '75', available: true, color: 'bg-lime-500' },
    { thickness: '0.6 mm', leadTime: '2-3 Days', price: '55', available: false, color: 'bg-purple-200' },
    { thickness: '1.2 mm', leadTime: '2-15 Days', price: '55', available: true, color: 'bg-blue-600' },
    { thickness: '2 mm', leadTime: '2-15 Days', price: '95', available: true, color: 'bg-lime-500' },
    { thickness: '3 mm', leadTime: '2-15 Days', price: '65', available: true, color: 'bg-purple-600' },
    { thickness: '2.5 mm', leadTime: '7-9 weeks', price: '65', available: true, color: 'bg-blue-600' },
    { thickness: '3.5 mm', leadTime: '7-9 weeks', price: '55', available: false, color: 'bg-lime-100' },
    { thickness: '1.5 mm', leadTime: '7-9 weeks', price: '55', available: true, color: 'bg-purple-600' }
  ];

  const handleSelect = (option) => {
    if (option.available) {
      setSelectedColour(option);
    }
  };

  const handlePreview = () => {
    if (selectedColour) {
      setStepStatus(prev => ({ ...prev, step6: true })); 
      navigate('/order/step7');
    }
  };

  const {
    cutLength,
    cutLengthUnit,
    cutLengthPieces,
    trimLengthPieces,
    supportLengthPieces
  } = kickplateData;

  const totalCut = allSets.reduce((sum, set) => sum + Number(set.cutLengthPieces || 0), 0) + Number(cutLengthPieces || 0);
  const totalTrim = allSets.reduce((sum, set) => sum + Number(set.trimLengthPieces || 0), 0) + Number(trimLengthPieces || 0);
  const totalSupport = allSets.reduce((sum, set) => sum + Number(set.supportLengthPieces || 0), 0) + Number(supportLengthPieces || 0);

  return (
    <div className="min-h-screen bg-[#f5f5dc] px-6 pt-24 pb-10 text-[#5c4033]">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-purple-800 mb-10 text-center border-b pb-2">
        <span className="text-blue-600"></span>SELECT COLOUR
      </h2>

      {/* Main Grid and Summary */}
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Colours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {colorsData.map((color, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(color)}
              className={`cursor-pointer rounded-lg p-4 text-center shadow-md border relative transition ${
                color.available ? `${color.color} text-white` : 'bg-gray-100 text-gray-400 border-gray-400'
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
            </div>
          ))}
        </div>

        {/* Floating Summary - now positioned side by side on large screens */}
        <div className="w-full max-w-xs bg-white border border-purple-300 shadow-lg p-4 rounded text-sm">
          <div className="flex justify-between items-center bg-green-600 text-white rounded mb-2 py-1 px-3 font-semibold">
            <span>Cut Length 200 mm</span>
            <span>{totalCut} pcs</span>
          </div>
          <div className="flex justify-between items-center bg-green-600 text-white rounded mb-2 py-1 px-3 font-semibold">
            <span>Trim 3 m</span>
            <span>{totalTrim} pcs</span>
          </div>
          <div className="flex justify-between items-center bg-green-600 text-white rounded mb-2 py-1 px-3 font-semibold">
            <span>Support 3 m</span>
            <span>{totalSupport} pcs</span>
          </div>
        </div>
      </div>

      {/* Preview Button */}
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
