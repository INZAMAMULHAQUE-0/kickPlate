import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step2_CutLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const cutLengthValue = parseFloat(kickplateData.cutLength);
  const isValidHeight = !isNaN(cutLengthValue) && cutLengthValue > 0;

  const handleNext = () => {
    if (!isValidHeight) return;
    navigate('/order/step3');
  };

  // Arrow height logic
  const getArrowHeight = () => {
    if (!isValidHeight) return 40;
    const scale = 2.5; // 1 unit = 2.5px
    const min = 40;
    const max = 256;
    return Math.min(Math.max(cutLengthValue * scale, min), max);
  };

  const dynamicArrowHeight = getArrowHeight();

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-4 text-center">
        <span className="text-blue-700">Custom Kick-Plate,</span> STEP 2 – Cut Length
      </h1>

      {/* Preview Box with Vertical Arrow on Right */}
      <div className="relative mb-4">
        {/* Fixed Box */}
        <div className="w-48 h-64 border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 italic">Preview Box</span>
        </div>

        {/* Vertical Bidirectional Arrow on Right */}
        <div
          className="absolute top-1/2 left-full ml-4 flex flex-col items-center justify-center"
          style={{ height: `${dynamicArrowHeight}px`, transform: 'translateY(-50%)' }}
        >
          {/* Top Arrowhead */}
          <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]"></div>

          {/* Line */}
          <div className="h-full w-0.5 bg-gray-600"></div>

          {/* Bottom Arrowhead */}
          <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]"></div>
        </div>
      </div>

      {/* Height Display */}
      <div className="mb-6 text-lg text-[#5c4033] font-semibold">
        {isValidHeight ? `${kickplateData.cutLength} ${kickplateData.cutLengthUnit}` : 'Enter Height to Preview'}
      </div>

      {/* Input & Unit */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="0.01"
          placeholder="Enter Height"
          value={kickplateData.cutLength}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, cutLength: e.target.value })
          }
          className="p-2 rounded bg-white border border-gray-300 text-gray-700"
        />
        <select
          value={kickplateData.cutLengthUnit}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, cutLengthUnit: e.target.value })
          }
          className="p-2 rounded bg-white border border-gray-300"
        >
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="inch">inch</option>
        </select>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!isValidHeight}
        className={`px-6 py-2 text-white rounded shadow transition-colors duration-200 ${
          isValidHeight
            ? 'bg-[#8b4513] hover:bg-[#7a3e00]'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step2_CutLength;
