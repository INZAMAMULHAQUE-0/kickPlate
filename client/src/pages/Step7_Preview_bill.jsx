import React from 'react';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';

const Step7_Preview_bill = () => {
  const { kickplateData, allSets, selectedColour, stepStatus, setStepStatus } = useKickplate();
  const navigate = useNavigate();

  const sets = [...(allSets || []), kickplateData];
  const getAreaPerPiece = 0.2;
  const panelRate = Number(selectedColour?.price || 0);
  const trimRate = selectedColour?.trimerate || 0;
  const supportRate = selectedColour?.supportrate || 0;

  const panelRows = sets.map((set, idx) => {
    const cutLen = set.cutLength/1000;
    const area = cutLen * getAreaPerPiece;
    const pieces = Number(set.cutLengthPieces || 0);
    const total = area * panelRate;

    return {
      label: `Panel ${cutLen} mm`,
      pieces,
      area,
      rate: panelRate,
      total
    };
  });

  const totalTrim = sets.reduce((sum, s) => sum + Number(s.trimLengthPieces || 0), 0);
  const totalSupport = sets.reduce((sum, s) => sum + Number(s.supportLengthPieces || 0), 0);

  const totalTrimCost = totalTrim * trimRate;
  const totalSupportCost = totalSupport * supportRate;
  const totalPanelCost = panelRows.reduce((sum, p) => sum + p.total, 0);

  const grandTotal = totalPanelCost + totalTrimCost + totalSupportCost;
  const grandTotalWithVat = grandTotal * 1.05;

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-10 text-[#333]">
      <h1 className="text-3xl font-bold text-purple-700 border-b-2 border-purple-300 pb-2 mb-8">
        <span className="text-blue-600"></span>PREVIEW ORDER
      </h1>

      {/* Panels */}
      {panelRows.map((row, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-4">
          <div className="border border-purple-500 px-4 py-2 w-48 text-center font-semibold">{row.label}</div>
          <div className="border border-purple-500 px-4 py-2 w-48 text-center">{row.pieces} pieces = {row.area.toFixed(2)} sm</div>
          <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {row.rate}</div>
          <div className="border border-purple-500 px-4 py-2 w-32 text-center">{row.total.toFixed(2)} Dhs</div>
        </div>
      ))}

      {/* Trim */}
      <div className="flex items-center gap-4 mb-4 mt-6">
        <div className="bg-green-600 text-white font-semibold px-6 py-2 w-48 text-center">Trim 3 m</div>
        <div className="border border-purple-500 px-4 py-2 w-48 text-center">{totalTrim} pieces</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {trimRate}</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">{totalTrimCost.toFixed(2)} Dhs</div>
      </div>

      {/* Support */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-600 text-white font-semibold px-6 py-2 w-48 text-center">Support 3 m</div>
        <div className="border border-purple-500 px-4 py-2 w-48 text-center">{totalSupport} pieces</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {supportRate}</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">{totalSupportCost.toFixed(2)} Dhs</div>
      </div>

      {/* Totals */}
      <div className="flex items-center gap-4 mt-10">
        <div className="text-xl font-bold">G. Total:</div>
        <div className="border border-purple-500 px-4 py-2 w-40 text-center font-semibold">Dhs {grandTotal.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="text-xl font-bold">G. Total with VAT:</div>
        <div className="border border-purple-500 px-4 py-2 w-48 text-center font-semibold">Dhs {grandTotalWithVat.toFixed(2)}</div>
      </div>

      {/* Selected Colour Preview */}
      {selectedColour && (
        <div className="mt-12 flex flex-col items-start">
          <h2 className="text-lg font-bold text-purple-700 mb-2">Selected Colour:</h2>
          <div
            className={`w-48 h-20 ${selectedColour.color} text-white rounded shadow-md flex items-center justify-center mb-2`}
          >
            <span className="text-xl font-semibold">{selectedColour.thickness}</span>
          </div>
          <div className="text-sm">
            {selectedColour.leadTime} @ Dhs {selectedColour.price}/sm
          </div>
        </div>
      )}

      {/* Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={() => {
            setStepStatus(prev => ({ ...prev, step7: true }));
            navigate('/order/step9');
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow text-lg font-semibold"
        >
          Choose Delivery
        </button>
      </div>
    </div>
  );
};

export default Step7_Preview_bill;
