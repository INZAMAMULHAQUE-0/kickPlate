import React from 'react';
import { useKickplate } from '../context/KickplateContext';

const PreviewPage = () => {
  const { kickplateData } = useKickplate();

  const {
    width,
    widthUnit,
    model,
    cutLength,
    cutLengthUnit,
    shedLength,
    shedLengthUnit,
    trimLength,
    supportLength
  } = kickplateData;

  const x = parseFloat(cutLength) || 0;
  const y = parseFloat(shedLength) || 0;
  const w = parseFloat(width) || 0;

  const arrowHeight = Math.min(Math.max(x / 2, 40), 128);
  const arrowWidth = Math.min(520); 
  const widthArrow = Math.min(Math.max(w * 1.5, 40), 80); // consistent with Step 1

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center px-6 py-10 text-[#5c4033]">
      <h1 className="text-3xl font-bold text-purple-800 mb-10 text-center border border-purple-400 px-6 py-2">
        <span className="text-blue-600">200 mm Kick-Plate –</span> Final Preview
      </h1>

      {/* Preview Box Section */}
      <div className="relative flex flex-col items-center mb-24"> {/* <- Increased spacing here */}
        <div className="flex items-center">
          {/* Vertical Arrow - Cut Length */}
          <div className="flex flex-col items-center mr-4">
            <div className="mb-1 text-sm font-semibold text-center">
              {x} {cutLengthUnit}
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

          {/* Blue Strip + Yellow Box */}
          <div className="flex relative">
            {/* Blue Strip (Width) */}
            <div className="w-10 h-32 bg-blue-300 border-l border-y border-gray-500 rounded-l-sm" />

            {/* Yellow Preview Box */}
            <div className="w-[500px] h-32 bg-[#fdf6d7] border-y border-r border-gray-500 rounded-r-sm flex items-center justify-center">
              <span className="text-gray-400 italic text-lg">Preview Box</span>
            </div>

            {/* Width Arrow below Blue Strip */}
            <div className="absolute left-0 top-full mt-2 w-10 flex flex-col items-center">
              <div className="w-full flex items-center justify-between border-t-2 border-b-2 border-gray-600 px-1">
                <span className="text-gray-600 text-sm">←</span>
                <div className="h-0.5 bg-gray-500 flex-grow mx-1" />
                <span className="text-gray-600 text-sm">→</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-center">{w} {widthUnit}</div>
            </div>
          </div>
        </div>

        {/* Horizontal Arrow - Shed Length */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-16 flex flex-col items-center">
          <div
            className="flex items-center justify-between border-t-2 border-b-2 border-gray-600 px-2 transition-all duration-300 ease-in-out"
            style={{ width: `${arrowWidth}px` }}
          >
            <span className="text-gray-600">←</span>
            <div className="h-0.5 bg-gray-600 flex-grow mx-1" />
            <span className="text-gray-600">→</span>
          </div>
          <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
            {y} {shedLengthUnit}
          </div>
        </div>
      </div>

      {/* Data Summary Fields */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg max-w-3xl w-full mt-16 mb-12 px-4">
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Width</span>
          <span>{w} {widthUnit}</span>
        </div>
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Model</span>
          <span>{model}</span>
        </div>
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Cut Length</span>
          <span>{cutLength} {cutLengthUnit}</span>
        </div>
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Shed Length</span>
          <span>{shedLength} {shedLengthUnit}</span>
        </div>
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Trim</span>
          <span>{trimLength} m</span>
        </div>
        <div className="flex justify-between border px-4 py-2 bg-white rounded shadow">
          <span className="font-medium">Support</span>
          <span>{supportLength} m</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <button
          onClick={() => navigate('/order')}
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
