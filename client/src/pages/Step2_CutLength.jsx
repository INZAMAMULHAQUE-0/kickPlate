import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step2_CutLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const handleNext = () => {
    if (!kickplateData.cutLength) return;
    navigate('/order/step3');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-4 text-center">
        <span className="text-blue-700">Custom Kick-Plate,</span> STEP 2 – Cut Length
      </h1>

      {/* Preview */}
      <div className="relative w-48 h-64 border-2 border-gray-400 bg-gray-100 mb-6">
        <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 text-[#5c4033] rotate-[-90deg]">
          {kickplateData.cutLength} {kickplateData.cutLengthUnit}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
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

      <button
        onClick={handleNext}
        className="px-6 py-2 bg-[#8b4513] text-white rounded shadow hover:bg-[#7a3e00]"
      >
        Next
      </button>
    </div>
  );
};

export default Step2_CutLength;