import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step1_SelectModel = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();

  useEffect(() => {
    setKickplateData({
      ...kickplateData,
      model: 'closed joint',
    });
  }, []);

  const isNextEnabled = kickplateData.model;

  const handleNext = () => {
    if (!isNextEnabled) return;
    setStepStatus({ ...stepStatus, step1: true });
    navigate('/order/step2');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10">
      <h1>website isn't live. Just discovering the flow, not the final look!!</h1>
      <h1 className="text-3xl font-bold text-[#5c4033] mb-10 text-center">
        <span className="text-blue-700"></span> Model
      </h1>

      {/* Preview Box and Blue Strip + Arrow */}
      <div className="mb-10 flex gap-10 items-start relative">
        {/* Preview Box */}
        <div className="w-[320px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded-sm flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-[24px] h-full bg-blue-200 left-1/2 -translate-x-1/2 rounded" />
          <span className="text-gray-400 italic text-lg z-10">Preview Box</span>
        </div>

        {/* Blue Strip + Arrow Below */}
        <div className="flex flex-col items-center">
          {/* Blue strip (aligned with preview box height) */}
          <div className="w-6 h-32 bg-blue-200 rounded shadow" />

          {/* Horizontal arrow and label */}
          <div className="mt-2 flex flex-col items-center">
            <div className="flex items-center justify-center w-6 relative">
              {/* Left Arrow Head */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 rotate-[-45deg] w-3 h-3 border-t-2 border-l-2 border-gray-600" />
              {/* Line */}
              <div className="h-0.5 w-full bg-gray-600 animate-pulse" />
              {/* Right Arrow Head */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-[135deg] w-3 h-3 border-t-2 border-l-2 border-gray-600" />
            </div>
            <div className="mt-1 text-[#5c4033] font-semibold text-sm">200 mm</div>
          </div>
        </div>
      </div>

      {/* Disabled Model Dropdown */}
      <select
        value={kickplateData.model}
        className="w-72 p-2 rounded bg-gray-100 border border-gray-300 mb-6 cursor-not-allowed text-black"
      >
        <option value="closed joint">closed joint</option>
        <option value="grove joint" disabled>grove joint</option>
      </select>

      {/* Width Dropdown */}
      <div className="flex gap-2 mb-4">
        <select
          value={kickplateData.width}
          onChange={(e) =>
            setKickplateData({
              ...kickplateData,
              width: e.target.value,
              widthUnit: 'mm',
            })
          }
          className="p-2 rounded bg-white border border-gray-300 text-black"
        >
          <option value="100" disabled>100 mm (Not Available)</option>
          <option value="200">200 mm</option>
          <option value="300" disabled>300 mm (Not Available)</option>
        </select>

        <select
          value="mm"
          className="p-2 rounded bg-gray-100 border border-gray-300 text-gray-700"
          disabled
        >
          <option value="mm">mm</option>
        </select>
      </div>

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
