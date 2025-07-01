import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step4_FinalSizes = () => {
  const { kickplateData, setKickplateData } = useKickplate();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [localValues, setLocalValues] = useState({
    cutLengthPieces: '',
    trimLengthPieces: '',
    supportLengthPieces: ''
  });

  const x = parseFloat(kickplateData.cutLength) || 200; // mm
  const y = parseFloat(kickplateData.shedLength) || 0;

  const xMeters = x / 1000;
  const yMeters = y / 1000;

  const calculatedCutLengthPieces = Math.ceil(yMeters / 0.2);
  const calculatedTrimPieces = Math.ceil(((x + y) / 1000) * 2 / 3 + 1);
  const calculatedSupportPieces = Math.ceil(Math.ceil(xMeters / 1.5) * (yMeters / 3));

  const arrowHeight = 105;
  const arrowWidth = 500;

  useEffect(() => {
    const updatedValues = {
      cutLengthPieces: calculatedCutLengthPieces,
      trimLengthPieces: calculatedTrimPieces,
      supportLengthPieces: calculatedSupportPieces
    };

    setKickplateData(prev => ({
      ...prev,
      ...updatedValues
    }));

    setLocalValues(prev => ({
      cutLengthPieces: prev.cutLengthPieces || updatedValues.cutLengthPieces,
      trimLengthPieces: prev.trimLengthPieces || updatedValues.trimLengthPieces,
      supportLengthPieces: prev.supportLengthPieces || updatedValues.supportLengthPieces
    }));
  }, [x, y]);

  const handleEditToggle = () => setIsEditable(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalValues(prev => ({ ...prev, [name]: value }));
    setKickplateData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => navigate('/order/step5');

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10 text-[#5c4033]">
      <h1 className="text-3xl font-bold text-brown-800 mb-10 border border-black-500 px-6 py-3 text-center">
        Final Sizes
      </h1>

      {/* Preview Section */}
      <div className="relative mb-16 flex flex-col items-center justify-center">
        <div className="flex items-center">
          {/* Vertical Arrow */}
          <div className="flex items-center mr-6">
            <div className="text-sm font-semibold text-right mr-2 w-16 text-[#5c4033]">
              {x} mm
            </div>
            <div
              className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
              style={{ height: `${arrowHeight}px` }}
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]" />
              <div className="h-full w-0.5 bg-gray-600" />
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]" />
            </div>
          </div>

          {/* Preview Box */}
          <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded shadow flex items-center justify-center relative">
            <span className="text-gray-400 italic text-lg">Preview Box</span>
          </div>
        </div>

        {/* Horizontal Arrow fixed to preview box width */}
        <div className="absolute left-90 -translate-x-1/2 top-full mt-4 flex flex-col items-center">
          <div
            className="flex items-center transition-all duration-300 ease-in-out"
            style={{ width: `${arrowWidth}px` }}
          >
            <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[-45deg]" />
            <div className="h-0.5 bg-gray-600 flex-grow mx-1" />
            <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[135deg]" />
          </div>
          <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
            {y} mm
          </div>
        </div>
      </div>

      {/* Fields with "pieces" text */}
      <div className="w-full max-w-xl flex flex-col gap-6 mb-8">
        {[
          ['Cut Length (200 mm)', 'cutLengthPieces'],
          ['Trim (3 m)', 'trimLengthPieces'],
          ['Support (3 m)', 'supportLengthPieces']
        ].map(([label, name]) => (
          <div key={name} className="flex justify-between items-center">
            <label className="text-lg font-medium w-1/2">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name={name}
                value={localValues[name]}
                onChange={handleChange}
                disabled={!isEditable}
                className="border border-gray-400 rounded px-4 py-2 w-40 text-right bg-white disabled:bg-gray-100"
              />
              <span className="text-sm text-[#5c4033] font-semibold">pieces</span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleEditToggle}
          className="bg-[#8b4513] hover:bg-[#7a3e00] text-white px-6 py-2 rounded shadow"
        >
          {isEditable ? 'Lock Values' : 'Edit'}
        </button>
        <button
          onClick={handlePreview}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default Step4_FinalSizes;