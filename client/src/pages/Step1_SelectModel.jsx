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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header Section */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="bg-orange-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-orange-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-semibold">Step 1 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1 tracking-tight drop-shadow-sm">
          Select Your Model
        </h1>
        <p className="text-black text-base sm:text-lg mt-2">Choose the model and width for your kickplate</p>
      </div>

      {/* Preview Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-3xl mb-8 sm:mb-12 bg-white/80 border-2 border-orange-100 rounded-2xl shadow-lg py-4 sm:py-8 px-2 sm:px-4">

        {/* Mobile Layout - Preview Box and Strip Side by Side */}
        <div className="flex sm:hidden items-center gap-4">
          {/* Preview Box with Orange Strip */}
          <div className="relative flex flex-col items-center">
            <div className="w-[140px] h-[100px] bg-white border-2 border-orange-200 rounded-md flex items-center justify-center shadow-xl overflow-hidden relative">
              {/* Left Orange Strip for mobile */}
              <div className="absolute top-0 left-1 h-full w-3 bg-orange-400 z-10" />
              <span className="text-black italic text-xs z-20 bg-white/80 px-2 py-1 rounded-full font-semibold shadow-sm">
                Preview Box
              </span>
            </div>
          </div>

          {/* Animated Right Arrow & Measurement for mobile */}
          <div className="flex flex-col items-center min-w-[50px]">
            <div className="w-3 h-[60px] bg-orange-400 rounded-md shadow-md" />
            <div className="mt-1 flex flex-col items-center animate-pulse">
              <div className="relative w-10 h-1.5">
                <div className="absolute top-1/2 left-0 w-1.5 h-1.5 border-r-2 border-b-2 border-orange-400 rotate-[-225deg] -translate-y-1/2" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-400 rounded" />
                <div className="absolute top-1/2 right-0 w-1.5 h-1.5 border-r-2 border-b-2 border-orange-400 rotate-[-45deg] -translate-y-1/2" />
              </div>
            </div>
            <div className="text-xs font-bold text-gray-600 mt-1">200 mm</div>
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden sm:flex sm:flex-col lg:flex-row items-center justify-center gap-8 w-full">
          {/* Preview Box with Right Orange Strip */}
          <div className="relative flex flex-col items-center">
            <div className="w-[240px] h-[160px] lg:w-[360px] lg:h-[240px] bg-white border-2 border-orange-200 rounded-md flex items-center justify-center shadow-xl overflow-hidden relative">
              {/* Right Orange Strip */}
              <div className="absolute top-0 left-1.5 h-full w-4 lg:w-6 bg-orange-400 z-10" />
              <span className="text-black italic text-lg lg:text-xl z-20 bg-white/80 px-4 py-1 rounded-full font-semibold shadow-sm">
                Preview Box
              </span>
            </div>
          </div>

          {/* Animated Right Arrow & Measurement */}
          <div className="flex flex-col items-center min-w-[90px] pt-6">
            <div className="w-6 h-[120px] lg:h-[180px] bg-orange-400 rounded-md shadow-md" />
            <div className="mt-3 flex flex-col items-center animate-pulse">
              <div className="relative w-16 lg:w-20 h-2">
                <div className="absolute top-1/2 left-0 w-3 h-3 border-r-2 border-b-2 border-orange-400 rotate-[-225deg] -translate-y-1/2" />
                <div className="absolute top-1/2 left-0 w-full h-0.25 bg-orange-400 rounded" />
                <div className="absolute top-1/2 right-0 w-3 h-3 border-r-2 border-b-2 border-orange-400 rotate-[-45deg] -translate-y-1/2" />
              </div>
            </div>
            <div className="text-base lg:text-lg font-bold text-gray-600 mt-2">200 mm</div>
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="w-full max-w-3xl bg-white/90 p-8 rounded-2xl shadow-lg border border-orange-100">
        {/* Model Selection */}
        <div className="mb-7">
          <label className="block text-base font-semibold text-black mb-3">
            Model Selection
          </label>
          <div className="flex gap-4 items-center">
            <select
              value={kickplateData.model}
              onChange={(e) => setKickplateData({ ...kickplateData, model: e.target.value })}
              className="flex-1 p-3 rounded-lg bg-background border border-orange-100 text-gray-600 font-medium focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            >
              <option value="Flush butt joint">Flush butt joint (Standard) </option>
              <option value="closed joint" disabled>Closed Joint (coming soon)</option>
              <option value="grove joint" disabled>Grove Joint (Coming Soon)</option>
            </select>
          </div>
        </div>

        {/* Width Selection */}
        <div className="mb-8">
          <label className="block text-base font-semibold text-black mb-3">
            Width Configuration
          </label>
          <div className="flex gap-4 items-center">
            <select
              value={kickplateData.width}
              onChange={(e) => setKickplateData({ ...kickplateData, width: e.target.value })}
              className="flex-1 p-3 rounded-lg bg-background border border-orange-100 text-gray-600 font-medium focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            >
              <option value="100" disabled>100</option>
              <option value="200">200</option>
              <option value="300" disabled>300</option>
            </select>
            <select
              value={kickplateData.widthUnit}
              onChange={(e) => setKickplateData({ ...kickplateData, widthUnit: e.target.value })}
              className="w-28 p-3 rounded-lg bg-background border border-orange-100 text-gray-600 font-medium focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            >
              <option value="mm">mm</option>
              <option value="cm" disabled>cm</option>
              <option value="m" disabled>m</option>
            </select>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-3 px-6 text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wide"
        >
          Continue to Next Step
        </button>
      </div>
    </div>
  );
};

export default Step1_SelectModel;