import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step4_FinalSizes = () => {
  const { kickplateData, setKickplateData } = useKickplate();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [localValues, setLocalValues] = useState({
    cutLength: '',
    trimLength: '',
    supportLength: ''
  });

  const x = parseFloat(kickplateData.cutLength) || 0; // mm
  const y = parseFloat(kickplateData.shedLength) || 0; // mm

  const xMeters = x / 1000;
  const yMeters = y / 1000;

  const calculatedCutLength = Math.ceil(yMeters / 0.2);
  const calculatedTrim = Math.ceil(((x + y) / 1000) * 2 / 3 + 1);
  const calculatedSupport = Math.max(0, Math.ceil(xMeters / 1.5) * (yMeters / 3));

  // Arrow length limits
  const arrowHeight = Math.min(Math.max(xMeters * 100, 40), 128);
  const arrowWidth = Math.min(Math.max(yMeters * 100, 40), 460);

  useEffect(() => {
    const updatedValues = {
      cutLength: calculatedCutLength,
      trimLength: calculatedTrim,
      supportLength: calculatedSupport.toFixed(2)
    };

    setKickplateData(prev => ({
      ...prev,
      ...updatedValues
    }));

    setLocalValues(updatedValues);
  }, [x, y]);

  const handleEditToggle = () => {
    setIsEditable(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalValues(prev => ({
      ...prev,
      [name]: value
    }));
    setKickplateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreview = () => {
    // Final save in context already done via handleChange
    navigate('/order/summary'); // Change to your actual final step path
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10 text-[#5c4033]">
      <h1 className="text-3xl font-bold text-purple-800 mb-10 border border-purple-500 px-6 py-3 text-center">
        <span className="text-blue-600">200 mm Kick-Plate –</span> Final Sizes
      </h1>

      {/* Preview Box with Arrows */}
      <div className="relative mb-16 flex items-center justify-center">
        {/* Left Vertical Arrow (X - Cut Length) */}
        <div className="flex flex-col items-center mr-4">
          <div className="mb-1 text-sm font-semibold text-center">
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

          {/* Bottom Horizontal Arrow (Y - Shed Length) */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 mt-4 flex flex-col items-center">
            <div
              className="flex items-center justify-between border-t-2 border-b-2 border-gray-600 px-2 transition-all duration-300 ease-in-out"
              style={{ width: `${arrowWidth}px` }}
            >
              <span className="text-gray-600">←</span>
              <div className="h-0.5 bg-gray-600 flex-grow mx-1" />
              <span className="text-gray-600">→</span>
            </div>
            <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
              {y} mm
            </div>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="w-full max-w-xl flex flex-col gap-6 mb-8">
        {[
          { label: 'Cut Length (pcs)', name: 'cutLength' },
          { label: 'Trim (m)', name: 'trimLength' },
          { label: 'Support (m)', name: 'supportLength' }
        ].map(({ label, name }) => (
          <div key={name} className="flex justify-between items-center">
            <label className="text-lg font-medium w-1/2">{label}</label>
            <input
              type="number"
              name={name}
              value={localValues[name]}
              onChange={handleChange}
              disabled={!isEditable}
              className="border border-gray-400 rounded px-4 py-2 w-40 text-right bg-white disabled:bg-gray-100"
            />
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
