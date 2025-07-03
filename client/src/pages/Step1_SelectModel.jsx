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
      <h1>website isn't live.Just discovering the flow, not the final look!!</h1>
      <h1 className="text-3xl font-bold text-[#5c4033] mb-10 text-center">
        <span className="text-blue-700"></span> Model
      </h1>

      {/* Preview Box Only */}
      <div className="mb-10">
        <div className="w-[470px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded-sm flex items-center justify-center">
          <span className="text-gray-400 italic text-lg">Preview Box</span>
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
