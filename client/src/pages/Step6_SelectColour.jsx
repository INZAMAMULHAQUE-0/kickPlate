import React from 'react';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';

const Step6_SelectColour = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData } = useKickplate();

  const colorsData = [
    { thickness: '0.6 mm', leadTime: '2-3 Days', price: 'Dhs 55/sm', available: true, color: 'bg-blue-600' },
    { thickness: '0.7 mm', leadTime: '2-3 Days', price: 'Dhs 75/sm', available: true, color: 'bg-lime-500' },
    { thickness: '0.6 mm', leadTime: '2-3 Days', price: 'Dhs 55/sm', available: false, color: 'bg-purple-200' },
    { thickness: '1.2 mm', leadTime: '2-15 Days', price: 'Dhs 55/sm', available: true, color: 'bg-blue-600' },
    { thickness: '2 mm', leadTime: '2-15 Days', price: 'Dhs 95/sm', available: true, color: 'bg-lime-500' },
    { thickness: '3 mm', leadTime: '2-15 Days', price: 'Dhs 65/sm', available: true, color: 'bg-purple-600' },
    { thickness: '2.5 mm', leadTime: '7-9 weeks', price: 'Dhs 65/sm', available: true, color: 'bg-blue-600' },
    { thickness: '3.5 mm', leadTime: '7-9 weeks', price: 'Dhs 55/sm', available: false, color: 'bg-lime-100' },
    { thickness: '1.5 mm', leadTime: '7-9 weeks', price: 'Dhs 55/sm', available: true, color: 'bg-purple-600' }
  ];

  const handleSelect = (option) => {
    if (option.available) {
      setKickplateData(prev => ({
        ...prev,
        selectedColour: option
      }));
    }
  };

  const handlePreview = () => {
    if (kickplateData.selectedColour) {
      setKickplateData(prev => ({
        ...prev,
        selectedColour: { ...kickplateData.selectedColour }
      }));
      console.log('Kickplate Data:', kickplateData);
      navigate('/order/step7');
    }
  };

  const {
    cutLengthPieces,
    trimLengthPieces,
    supportLengthPieces,
    allSets = []
  } = kickplateData;

  const totalCut = allSets.reduce((sum, set) => sum + Number(set.cutLengthPieces || 0), 0) + Number(cutLengthPieces || 0);
  const totalTrim = allSets.reduce((sum, set) => sum + Number(set.trimLengthPieces || 0), 0) + Number(trimLengthPieces || 0);
  const totalSupport = allSets.reduce((sum, set) => sum + Number(set.supportLengthPieces || 0), 0) + Number(supportLengthPieces || 0);

  return (
    <div className="min-h-screen relative bg-[#f5f5dc] px-6 pt-40 pb-10 text-[#5c4033]">
      {/* Floating Summary */}
      <div className="fixed top-28 right-6 bg-white border border-purple-300 shadow-lg p-4 rounded text-sm w-60 z-50">
        <div className="flex justify-between items-center bg-green-600 text-white rounded mb-2 py-1 px-3 font-semibold">
          <span>Cut Length 200 mm</span>
          <span>{totalCut} pcs</span>
        </div>
        <div className="flex justify-between items-center bg-green-600 text-white rounded mb-2 py-1 px-3 font-semibold">
          <span>Trim 3 m</span>
          <span>{totalTrim} pcs</span>
        </div>
        <div className="flex justify-between items-center bg-green-600 text-white rounded mb-3 py-1 px-3 font-semibold">
          <span>Support 3 m</span>
          <span>{totalSupport} pcs</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-purple-800 mb-10 text-center border-b pb-2">
        <span className="text-blue-600"></span>SELECT COLOUR
      </h2>

      <div className="mb-6 text-lg font-semibold text-white bg-white-600 inline-block px-4 py-2 rounded">
        Select Colour
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {colorsData.map((color, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(color)}
            className={`cursor-pointer rounded-lg p-4 text-center shadow-md border relative transition ${
              color.available ? `${color.color} text-white` : 'bg-gray-100 text-gray-400 border-gray-400'
            } ${
              kickplateData.selectedColour?.thickness === color.thickness ? 'ring-4 ring-yellow-400' : ''
            }`}
          >
            {!color.available && (
              <div className="absolute top-1 left-2 text-red-700 text-xs font-bold">NA</div>
            )}
            <div className="text-xl font-semibold">{color.thickness}</div>
            <div className="text-sm mt-2">{color.leadTime} - @ {color.price}</div>
          </div>
        ))}
      </div>

      {/* Preview Button */}
      <div className="flex justify-center">
        <button
          onClick={handlePreview}
          disabled={!kickplateData.selectedColour}
          className={`px-6 py-3 rounded shadow font-semibold transition ${
            kickplateData.selectedColour
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default Step6_SelectColour;
