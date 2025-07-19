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
      width: '200',
      widthUnit: 'mm'
    });
  }, []);

  const handleNext = () => {
    setStepStatus({ ...stepStatus, step1: true });
    navigate('/order/step2');
  };

  return (
    <div className="min-h-screen bg-[#F5F9F4] flex flex-col items-center px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="bg-white/80 inline-block px-4 py-1 rounded-full mb-3 shadow-sm border border-[#E0EDDC]">
          <span className="text-xs text-[#5A6D5A]">Step 1 of 8</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3A2F] mb-2">
          Select Your Model
        </h1>
      </div>

      {/* Preview Section */}
      <div className="flex items-center gap-6 mb-8"> {/* Increased gap to 6 */}
        {/* Preview Box with Center Blue Strip */}
        <div className="relative -mt-10">
          <div className="w-[240px] h-[160px] sm:w-[360px] sm:h-[240px] bg-white border-2 border-[#D4E3D0] rounded-md flex items-center justify-center shadow-inner overflow-hidden">
            {/* Middle Blue Strip */}
            <div className="absolute w-6 h-full bg-[#4A89DC] left-1/2 transform -translate-x-1/2 z-10 opacity-90" />
            <span className="text-[#5A6D5A] italic text-lg sm:text-xl z-20 bg-white/80 px-3 py-1 rounded-full">
              Preview Box
            </span>
          </div>
        </div>

        {/* Right Blue Strip with Measurement */}
        <div className="flex flex-col items-center">
          {/* Blue Strip - Increased height for desktop */}
          <div className="w-6 h-[130px] sm:h-[200px] bg-[#4A89DC] rounded-md shadow-md" />
          
          {/* Animated Arrow - Larger for desktop */}
          <div className="mt-2 sm:mt-4 flex flex-col items-center animate-pulse">
            <div className="relative w-12 sm:w-24 h-6">
              <div className="absolute top-1/2 left-0 w-full h-0.5 sm:h-1 bg-[#4A89DC]" />
              <div className="absolute top-1/2 right-0 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-[#4A89DC] transform rotate-[-45deg] translate-y-[-50%]" />
            </div>
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1A3A2F] mt-1 sm:mt-2">200 mm</div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow-sm border border-[#E0EDDC]">
        {/* Model Selection */}
       <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joint Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['closed joint', 'grove joint'].map((joint) => (
                <button
                  key={joint}
                  onClick={() => joint === 'closed joint' && 
                    setKickplateData({ ...kickplateData, model: joint })}
                  disabled={joint !== 'closed joint'}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    kickplateData.model === joint
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    joint !== 'closed joint' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium text-gray-800 capitalize">
                      {joint.replace(' joint', '')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {joint === 'closed joint' ? 'Standard' : 'Coming soon'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        {/* Width Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#1A3A2F] mb-2">
            Width Configuration
          </label>
          <div className="flex gap-3">
            <select
              value={kickplateData.width}
              onChange={(e) => setKickplateData({...kickplateData, width: e.target.value})}
              className="flex-1 p-3 rounded-lg bg-[#F5F9F4] border border-[#D4E3D0] text-[#1A3A2F]"
            >
              <option value="100" disabled>100 mm</option>
              <option value="200">200 mm</option>
              <option value="300" disabled>300 mm</option>
            </select>
            <div className="w-20 p-3 rounded-lg bg-[#EFF5EE] text-[#6B7F6B] text-center border border-[#D4E3D0]">
              mm
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-3 px-6 bg-[#4A89DC] hover:bg-[#3A79CC] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Continue to Next Step
        </button>
      </div>
    </div>
  );
};

export default Step1_SelectModel;