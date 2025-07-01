import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const PreviewPage = () => {
  const { kickplateData } = useKickplate();
  const navigate = useNavigate();

  const {
    cutLength,
    shedLength,
    cutLengthPieces,
    trimLengthPieces,
    supportLengthPieces
  } = kickplateData;

  const x = parseFloat(cutLength) || 0;
  const y = parseFloat(shedLength) || 0;

  const arrowHeight = Math.min(Math.max(x / 2, 40), 128);
  const arrowWidth = 500;

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10 text-[#5c4033]">
      <h1 className="text-3xl font-bold text-purple-800 mb-10 text-center border border-purple-400 px-6 py-2">
        <span className="text-blue-600">200 mm Kick-Plate –</span> Final Preview
      </h1>
      {/* Preview Section */}
      <div className="relative mb-16 flex flex-col items-center justify-center">
        <div className="flex items-center">
          {/* Vertical Arrow */}
          <div className="flex items-center mr-6">
            <div className="text-sm font-semibold text-right mr-2 w-16 text-[#5c4033]">
              {x} mm
            </div>
            <div
              className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
              style={{ height: `${arrowHeight}px` }}
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]" />
              <div className="h-full w-0.5 bg-gray-600" />
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]" />
            </div>
          </div>

          {/* Preview Box */}
          <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded shadow flex items-center justify-center relative">
            <span className="text-gray-400 italic text-lg">Preview Box</span>
          </div>
        </div>

        {/* Horizontal Arrow fixed to preview box width */}
        <div className="absolute left-90 -translate-x-1/2 top-full mt-4 flex flex-col items-center">
          <div
            className="flex items-center transition-all duration-300 ease-in-out"
            style={{ width: `${arrowWidth}px` }}
          >
            <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[-45deg]" />
            <div className="h-0.5 bg-gray-600 flex-grow mx-1" />
            <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[135deg]" />
          </div>
          <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
            {y} mm
          </div>
        </div>
      </div>

      {/* Cut, Trim, Support Fields (Styled like Step4_FinalSizes) */}
      <div className="w-full max-w-xl flex flex-col gap-6 mb-12">
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium w-1/2">Cut Length (200)</label>
          <input
            type="number"
            value={cutLengthPieces}
            disabled
            className="border border-gray-400 rounded px-4 py-2 w-40 text-right bg-gray-100"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium w-1/2">Trim (3m)</label>
          <input
            type="number"
            value={trimLengthPieces}
            disabled
            className="border border-gray-400 rounded px-4 py-2 w-40 text-right bg-gray-100"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium w-1/2">Support (3m)</label>
          <input
            type="number"
            value={supportLengthPieces}
            disabled
            className="border border-gray-400 rounded px-4 py-2 w-40 text-right bg-gray-100"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <button
          onClick={() => navigate('/order/step2')}
          className="px-6 py-3 bg-gradient-to-br from-[#8b4513] to-black text-white font-semibold rounded shadow hover:opacity-90 transition"
        >
          Add More Sizes
        </button>
        <button
          onClick={() => navigate('/order/step6')}
          className="px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-500 text-white font-semibold rounded shadow hover:opacity-90 transition"
        >
          Next: Choose Colour
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;