import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

const Step2_CutLength = () => {
  const navigate = useNavigate();
  const { kickplateData, setKickplateData, stepStatus, setStepStatus } = useKickplate();

  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('mm');

  // Convert value to millimeters
  const convertToMM = (value, unit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    switch (unit) {
      case 'cm': return val * 10;
      case 'meter': return val * 1000;
      default: return val;
    }
  };

  const displayFormattedValue = () => {
    const mm = parseFloat(kickplateData.cutLength);
    if (isNaN(mm)) return '';
    switch (selectedUnit) {
      case 'cm': return (mm / 10).toFixed(1);
      case 'meter': return (mm / 1000).toFixed(2);
      default: return mm.toString();
    }
  };

  // Load existing values if present, no default applied
  useEffect(() => {
    if (kickplateData.cutLengthUnit) {
      setSelectedUnit(kickplateData.cutLengthUnit);
    }
  }, []);

  const handleLengthChange = (val) => {
    setInputValue(val);
    const converted = convertToMM(val, selectedUnit);
    setKickplateData({
      ...kickplateData,
      cutLength: converted.toString(),
      cutLengthUnit: selectedUnit,
    });
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    const formatted = displayFormattedValue();
    setInputValue(formatted);
    const converted = convertToMM(formatted, unit);
    setKickplateData({
      ...kickplateData,
      cutLength: converted.toString(),
      cutLengthUnit: unit,
    });
  };

  const cutLengthMM = parseFloat(kickplateData.cutLength);
  const isValidHeight = !isNaN(cutLengthMM) && cutLengthMM > 0;

  const handleNext = () => {
    if (!isValidHeight) return;
    setStepStatus({ ...stepStatus, step2: true });
    navigate('/order/step3');
  };

  const getArrowHeight = () => {
    if (!isValidHeight) return 40;
    const scale = 2.5;
    const min = 40;
    const max = 128;
    return Math.min(Math.max(cutLengthMM * scale, min), max);
  };

  const dynamicArrowHeight = getArrowHeight();

  const getLabel = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 'Cut Length';
    return `${val} ${selectedUnit}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-[#5c4033] mb-6 text-center">
        Cut Length
      </h1>

      {/* Arrow Preview */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="flex items-center mr-4">
          <div className="text-[#5c4033] font-semibold text-sm mr-2 w-24 text-right">
            {getLabel()}
          </div>
          <div
            className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
            style={{ height: `${dynamicArrowHeight}px` }}
          >
            <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[-135deg]" />
            <div className="h-full w-0.5 bg-gray-600" />
            <div className="w-3 h-3 border-r-2 border-b-2 border-gray-600 rotate-[45deg]" />
          </div>
        </div>

        {/* Preview Box */}
        <div className="w-[500px] h-32 bg-[#fdf6d7] border-2 border-gray-400 rounded-sm flex items-center justify-center">
          <span className="text-gray-400 italic text-lg">Preview Box</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="0"
          placeholder="Cut Length"
          value={inputValue}
          onChange={(e) => handleLengthChange(e.target.value)}
          className="p-2 rounded bg-white border border-gray-300 text-black w-32"
        />
        <select
          value={selectedUnit}
          onChange={(e) => handleUnitChange(e.target.value)}
          className="p-2 rounded bg-white border border-gray-300 text-black"
        >
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="meter">meter</option>
        </select>
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={!isValidHeight}
        className={`px-6 py-2 text-white rounded shadow transition-colors duration-200 ${
          isValidHeight
            ? 'bg-[#8b4513] hover:bg-[#7a3e00]'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step2_CutLength;
