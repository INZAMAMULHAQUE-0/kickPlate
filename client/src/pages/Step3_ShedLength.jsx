import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step3_ShedLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const handleNext = () => {
    if (!kickplateData.shedLength) return;
    console.log('Final Config:', kickplateData);
    // navigate('/order/summary') or submit
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-4 text-center">
        <span className="text-blue-700">Pergola Kick-Plate –</span> Step 3 – LENGTH of shed
      </h1>

      {/* Preview */}
      <div className="relative w-64 h-40 border-2 border-gray-400 bg-gray-100 mb-6">
        <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-[#5c4033]">
          {kickplateData.shedLength} {kickplateData.shedLengthUnit}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter Length"
          value={kickplateData.shedLength}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, shedLength: e.target.value })
          }
          className="p-2 rounded bg-white border border-gray-300 text-gray-700"
        />
        <select
          value={kickplateData.shedLengthUnit}
          onChange={(e) =>
            setKickplateData({ ...kickplateData, shedLengthUnit: e.target.value })
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

export default Step3_ShedLength;
