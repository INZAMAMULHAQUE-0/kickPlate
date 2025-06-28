import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step1_SelectModel = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const widthValue = parseFloat(kickplateData.width);
  const isValidWidth = !isNaN(widthValue) && widthValue > 0;
  const isNextEnabled = isValidWidth && kickplateData.model;

  // Arrow width logic (box is fixed)
  const getArrowWidth = () => {
    if (!isValidWidth) return 40;
    const scale = 2.5; // 1 unit = 2.5px
    const min = 40;
    const max = 256;
    return Math.min(widthValue * scale, max);
  };

  const dynamicArrowWidth = getArrowWidth();

  const handleNext = () => {
    if (!isNextEnabled) return;
    navigate('/order/step2');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-4 text-center">
        <span className="text-blue-700">Custom Kick-Plate,</span> STEP 1 – Select Model
      </h1>

      {/* Fixed Preview Box */}
      <div className="w-64 h-24 border-2 border-gray-400 bg-gray-100 flex items-center justify-center mb-2">
        <span className="text-gray-400 italic">Preview Box</span>
      </div>

      {/* Correctly Positioned Horizontal Arrow */}
      <div className="flex flex-col items-center mb-2">
        <div
          className="flex items-center justify-between px-2 border-t-2 border-b-2 border-gray-600 transition-all duration-300"
          style={{
            width: `${dynamicArrowWidth}px`,
            marginTop: '-4px',
          }}
        >
          <span className="text-gray-600 text-xl">←</span>
          <div className="h-0.5 bg-gray-500 flex-grow mx-1" />
          <span className="text-gray-600 text-xl">→</span>
        </div>
      </div>

      {/* Width Display */}
      <div className="mb-6 text-lg text-[#5c4033] font-semibold">
        {isValidWidth ? `${kickplateData.width} ${kickplateData.widthUnit}` : 'Enter Width to Preview'}
      </div>

      {/* Width Input + Unit Select */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="0.01"
          placeholder="Enter Width"
          value={kickplateData.width}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, width: e.target.value })
          }
          className="p-2 rounded bg-white border border-gray-300 text-gray-700"
        />
        <select
          value={kickplateData.widthUnit}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, widthUnit: e.target.value })
          }
          className="p-2 rounded bg-white border border-gray-300"
        >
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="inch">inch</option>
        </select>
      </div>

      {/* Model Select */}
      <select
        value={kickplateData.model}
        onChange={(e) =>
          setKickplateData({ ...kickplateData, model: e.target.value })
        }
        className="w-72 p-2 rounded bg-white border border-gray-300 mb-6"
      >
        <option value="">Select Model</option>
        <option value="default">Default Model</option>
      </select>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!isNextEnabled}
        className={`px-6 py-2 text-white rounded shadow transition-colors duration-200 ${
          isNextEnabled
            ? 'bg-[#8b4513] hover:bg-[#7a3e00]'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step1_SelectModel;
