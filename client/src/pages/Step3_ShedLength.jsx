import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step3_ShedLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  // Convert to mm if unit was previously stored as something else
  const convertToMM = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    switch (unit) {
      case 'cm':
        return val * 10;
      case 'meter':
        return val * 1000;
      default:
        return val;
    }
  };

  useEffect(() => {
    // If not mm, convert and store as mm
    if (kickplateData.shedLength && kickplateData.shedLengthUnit && kickplateData.shedLengthUnit !== 'mm') {
      const converted = convertToMM(kickplateData.shedLength, kickplateData.shedLengthUnit);
      setKickplateData({
        ...kickplateData,
        shedLength: converted.toString(),
        shedLengthUnit: 'mm',
      });
    }
  }, []);

  const shedLengthValue = parseFloat(kickplateData.shedLength) || 0;
  const isValidLength = shedLengthValue > 0;

  const getArrowWidth = () => {
    if (!isValidLength) return 60;
    const scale = 2;
    const min = 60;
    const max = 500;
    return Math.min(Math.max(shedLengthValue * scale, min), max);
  };

  const dynamicArrowWidth = getArrowWidth();

  const handleNext = () => {
    if (!isValidLength) return;
    navigate('/order/step4');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-6 text-center">
        Length of Shed
      </h1>

      {/* Preview Section */}
      <div className="relative flex flex-col items-center justify-center mb-16">
        <div className="flex items-center">
          {/* Vertical Arrow (cut length) */}
          <div className="flex items-center mr-6">
            <div className="text-sm font-semibold text-right mr-2 w-16 text-[#5c4033]">
              {kickplateData.cutLength} mm
            </div>
            <div
              className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
              style={{ height: '128px' }}
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]" />
              <div className="h-full w-0.5 bg-gray-600" />
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]" />
            </div>
          </div>

          {/* Preview Box */}
          <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded-sm flex items-center justify-center shadow">
            <span className="text-gray-400 italic text-lg">Preview Box</span>
          </div>
        </div>

        {/* Horizontal Arrow */}
        <div className="absolute left-90 -translate-x-1/2 top-full mt-4 flex flex-col items-center">
          <div
            className="flex items-center transition-all duration-300 ease-in-out"
            style={{ width: `${dynamicArrowWidth}px`, maxWidth: '500px' }}
          >
            <div className="w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-[-135deg]" />
            <div className="h-0.5 bg-gray-600 flex-grow mx-1 min-w-[30px]" />
            <div className="w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-[45deg]" />
          </div>
          <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
            {isValidLength ? `${kickplateData.shedLength} mm` : 'Enter Length'}
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="mt-4 flex items-center gap-3 mb-8">
        <input
          type="number"
          min="0.01"
          placeholder="Enter Length"
          value={kickplateData.shedLength}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, shedLength: e.target.value })
          }
          className="p-2 w-48 rounded bg-white border border-gray-300 text-gray-700 shadow-sm"
        />
        <select
          value="mm"
          disabled
          className="p-2 w-32 rounded bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed"
        >
          <option value="mm">mm</option>
        </select>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!isValidLength}
        className={`px-6 py-2 text-white rounded shadow transition duration-200 ${
          isValidLength
            ? 'bg-[#8b4513] hover:bg-[#7a3e00]'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step3_ShedLength;