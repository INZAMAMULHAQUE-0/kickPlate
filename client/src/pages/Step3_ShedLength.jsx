import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step3_ShedLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  useEffect(() => {
    if (!kickplateData.shedLengthUnit) {
      setKickplateData({ ...kickplateData, shedLengthUnit: 'mm' });
    }
  }, []);

  const shedLengthValue = parseFloat(kickplateData.shedLength);
  const isValidLength = !isNaN(shedLengthValue) && shedLengthValue > 0;

  const getArrowWidth = () => {
    if (!isValidLength) return 40;
    const scale = 2;
    const min = 40;
    const max = 460;
    return Math.min(Math.max(shedLengthValue * scale, min), max);
  };

  const dynamicArrowWidth = getArrowWidth();

  const handleNext = () => {
    if (!isValidLength) return;
    console.log('Final Config:', kickplateData);
    navigate('/order/step4');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-6 text-center">
        <span className="text-blue-700"></span>Length of Shed
      </h1>

      {/* Preview Area */}
      <div className="relative mb-12">
        {/* Yellow Preview Box */}
        <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded-sm flex items-center justify-center shadow">
          <span className="text-gray-400 italic text-lg">Preview Box</span>
        </div>

        {/* Animated Arrow + Value Label */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-4 flex flex-col items-center">
          <div
            className="flex items-center justify-between border-t-2 border-b-2 border-gray-600 px-2 transition-all duration-300 ease-in-out"
            style={{ width: `${dynamicArrowWidth}px` }}
          >
            <span className="text-gray-600">←</span>
            <div className="h-0.5 bg-gray-600 flex-grow mx-1" />
            <span className="text-gray-600">→</span>
          </div>
          <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
            {isValidLength ? `${kickplateData.shedLength} ${kickplateData.shedLengthUnit}` : 'Enter Length'}
          </div>
        </div>
      </div>

      {/* Optional Divider */}
      {/* <hr className="w-full max-w-md border-t border-gray-300 my-6" /> */}

      {/* Input Fields with extra spacing */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 mb-8">
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
          value={kickplateData.shedLengthUnit}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, shedLengthUnit: e.target.value })
          }
          className="p-2 w-32 rounded bg-white border border-gray-300 shadow-sm"
        >
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="meter">meter</option>
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