import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step1_SelectModel = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();

  useEffect(() => {
    setKickplateData({
      ...kickplateData,
      width: '200',
      widthUnit: 'mm',
      model: 'closed joint',
    });
  }, []);

  const widthValue = parseFloat(kickplateData.width);
  const isValidWidth = !isNaN(widthValue) && widthValue > 0;
  const isNextEnabled = isValidWidth && kickplateData.model;

  const getArrowWidth = () => {
    if (!isValidWidth) return 20;
    const scale = 1.5;
    const min = 0;
    const max = 256;
    return Math.min(widthValue * scale, max);
  };

  const dynamicArrowWidth = getArrowWidth();

  const handleNext = () => {
    if (!isNextEnabled) return;
    setStepStatus({ ...stepStatus, step1: true });
    navigate('/order/step2');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10">
      <h1 className="text-3xl font-bold text-[#5c4033] mb-10 text-center">
        <span className="text-blue-700"></span> Model & Width </h1>

      {/* Unified Preview Box with Blue Strip on Left */}
      <div className="relative mb-10">
        <div className="flex">
          {/* Blue strip - visually part of yellow box */}
          <div className="w-10 h-32 bg-blue-200 border-l border-y border-gray-400 rounded-l-sm shadow-inner relative z-10"></div>

          {/* Yellow box */}
          <div className="w-[460px] h-32 bg-[#fdf6d7] border-2 border-gray-400 border-l-0 rounded-r-sm flex items-center justify-center">
            <span className="text-gray-400 italic text-lg">Preview Box</span>
          </div>
        </div>

        {/* Arrow + 200mm under the blue part only */}
<div className="absolute left-0 top-full mt-2 flex flex-col items-center w-10">
  <div className="w-full flex items-center justify-between border-t-2 border-b-2 border-gray-600 px-1">
    <span className="text-gray-600 text-sm">←</span>
    <div className="h-0.5 bg-gray-500 flex-grow mx-1" />
    <span className="text-gray-600 text-sm">→</span>
  </div>
  <div className="mt-1 text-[#5c4033] font-semibold text-xs text-center">
    {kickplateData.width} {kickplateData.widthUnit}
  </div>
</div>

      </div>

      {/* Disabled Inputs */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={kickplateData.width}
          disabled
          className="p-2 rounded bg-gray-100 border border-gray-300 text-gray-700 cursor-not-allowed"
        />
        <select
          value={kickplateData.widthUnit}
          disabled
          className="p-2 rounded bg-gray-100 border border-gray-300 cursor-not-allowed"
        >
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>

      <select
        value={kickplateData.model}
        disabled
        className="w-72 p-2 rounded bg-gray-100 border border-gray-300 mb-6 cursor-not-allowed"
      >
        <option value="closed joint">closed joint</option>
        <option value="open joint">open joint</option>
      </select>

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
