import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step3_ShedLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();

  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('mm');

  // Load existing values on mount
  useEffect(() => {
    if (kickplateData.shedLength && kickplateData.shedLengthUnit) {
      const mm = parseFloat(kickplateData.shedLength);
      let displayValue = mm;

      switch (kickplateData.shedLengthUnit) {
        case 'cm':
          displayValue = mm / 10;
          break;
        case 'meter':
          displayValue = mm / 1000;
          break;
        default:
          displayValue = mm;
      }

      setInputValue(displayValue.toString());
      setSelectedUnit(kickplateData.shedLengthUnit);
    }
  }, []);

  // Convert any unit to mm
  const convertToMM = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    switch (unit) {
      case 'cm':
        return val * 10;
      case 'meter':
        return val * 1000;
      default:
        return val;
    }
  };

  const handleInputChange = (val) => {
    setInputValue(val);
    const mmValue = convertToMM(val, selectedUnit);
    setKickplateData({
      ...kickplateData,
      shedLength: mmValue.toString(),
      shedLengthUnit: selectedUnit,
    });
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    const mmValue = convertToMM(inputValue, unit);
    setKickplateData({
      ...kickplateData,
      shedLength: mmValue.toString(),
      shedLengthUnit: unit,
    });
  };

  const parsedLength = parseFloat(inputValue);
  const isValidLength = !isNaN(parsedLength) && parsedLength > 0;

  const getArrowWidth = () => {
    if (!isValidLength) return 60;
    const scale = 2;
    const min = 60;
    const max = 500;
    return Math.min(Math.max(convertToMM(parsedLength, selectedUnit) * scale, min), max);
  };

  const dynamicArrowWidth = getArrowWidth();

  const formatCutLengthDisplay = () => {
    const val = parseFloat(kickplateData.cutLength);
    const unit = kickplateData.cutLengthUnit || 'mm';

    if (isNaN(val)) return '—';

    switch (unit) {
      case 'cm':
        return `${(val / 10).toFixed(1)} cm`;
      case 'meter':
        return `${(val / 1000).toFixed(2)} meter`;
      default:
        return `${val.toFixed(0)} mm`;
    }
  };

  const handleNext = () => {
    if (!isValidLength) return;
    setStepStatus(prev => ({ ...prev, step3: true }));
    navigate('/order/step4');
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-6 text-center">
        Length of Shed
      </h1>

      {/* Preview Section */}
      <div className="relative mb-20 flex flex-col items-center justify-center">
        <div className="flex items-center">
          {/* Vertical Arrow */}
          <div className="flex items-center mr-6">
            <div className="text-sm font-semibold text-right mr-2 w-20 text-[#5c4033]">
              {formatCutLengthDisplay()}
            </div>
            <div
              className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
              style={{ height: `128px` }}
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]" />
              <div className="h-full w-0.5 bg-gray-600" />
              <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]" />
            </div>
          </div>

          {/* Preview Box */}
          <div className="relative">
            <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded shadow flex items-center justify-center">
              <span className="text-gray-400 italic text-lg">Preview Box</span>
            </div>

            {/* Horizontal Arrow */}
            <div className="absolute bottom-[-64px] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div
                className="flex items-center transition-all duration-300 ease-in-out"
                style={{ width: `${dynamicArrowWidth}px`, maxWidth: '500px' }}
              >
                <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[-45deg]" />
                <div className="h-0.5 bg-gray-600 flex-grow mx-1 min-w-[30px]" />
                <div className="w-3 h-3 border-t-2 border-l-2 border-gray-600 rotate-[135deg]" />
              </div>
              <div className="mt-1 text-[#5c4033] font-semibold text-sm text-center">
                {isValidLength ? `${inputValue} ${selectedUnit}` : 'Enter Length'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="mt-4 flex items-center gap-3 mb-8">
        <input
          type="number"
          min="0.01"
          placeholder="Enter shed Length"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="p-2 w-48 rounded bg-white border border-gray-300 text-gray-700 shadow-sm"
        />
        <select
          value={selectedUnit}
          onChange={(e) => handleUnitChange(e.target.value)}
          className="p-2 w-32 rounded bg-white border border-gray-300 text-gray-700 shadow-sm"
        >
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="meter">meter</option>
        </select>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!isValidLength}
        className={`px-6 py-2 text-white rounded shadow transition duration-200 ${
          isValidLength ? 'bg-[#8b4513] hover:bg-[#7a3e00]' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step3_ShedLength;
