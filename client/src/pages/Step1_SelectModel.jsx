import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step1_SelectModel = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const handleNext = () => {
    if (!kickplateData.width || !kickplateData.model) return;
    navigate('/order/step2');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-4 text-center">
        <span className="text-blue-700">Custom Kick-Plate,</span> STEP 1 – Select Model
      </h1>

      {/* Preview */}
      <div className="w-64 h-24 border-2 border-gray-400 bg-gray-100 flex items-center justify-center mb-6">
        <span className="text-[#5c4033] font-semibold">
          {kickplateData.width} {kickplateData.widthUnit}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
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

      <select
        value={kickplateData.model}
        onChange={(e) =>
          setKickplateData({ ...kickplateData, model: e.target.value })
        }
        className="w-72 p-2 rounded bg-white border border-gray-300 mb-6"
      >
        <option value="default">Default Model</option>
      </select>

      <button
        onClick={handleNext}
        className="px-6 py-2 bg-[#8b4513] text-white rounded shadow hover:bg-[#7a3e00]"
      >
        Next
      </button>
    </div>
  );
};

export default Step1_SelectModel;