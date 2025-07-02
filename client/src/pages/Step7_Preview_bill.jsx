import React from 'react';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';

const Step7_Preview_bill = () => {
  const { kickplateData } = useKickplate();
  const navigate = useNavigate();

  const allSets = [...(kickplateData.allSets || []), kickplateData];

  const getAreaPerPiece = 0.2; // m²
  const parsePrice = (priceString) => parseFloat(priceString.replace(/[^0-9.]/g, ''));

  const setsWithTotals = allSets.map((set, index) => {
    const pieces = Number(set.cutLengthPieces || 0);
    const area = pieces * getAreaPerPiece;
    const pricePerSm = parsePrice(set.selectedColour?.price || '0');
    const total = area * pricePerSm;

    return {
      label: `Panel ${index + 1} – ${set.cutLength} mm`,
      pieces,
      area,
      pricePerSm,
      total,
      colorBox: set.selectedColour,
    };
  });

  const totalTrim = Number(kickplateData.trimLengthPieces || 0);
  const trimRate = 15; // Set your trim price per piece
  const totalTrimCost = totalTrim * trimRate;

  const totalSupport = Number(kickplateData.supportLengthPieces || 0);
  const supportRate = 20; // Set your support price per piece
  const totalSupportCost = totalSupport * supportRate;

  const grandTotal = setsWithTotals.reduce((sum, s) => sum + s.total, 0) + totalTrimCost + totalSupportCost;
  const grandTotalWithVat = grandTotal * 1.05;

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-10 text-[#333]">
      <h1 className="text-3xl font-bold text-purple-700 border-b-2 border-purple-300 pb-2 mb-8">
        <span className="text-blue-600"></span>PREVIEW ORDER
      </h1>

      {/* Panels Summary */}
      {setsWithTotals.map((set, index) => (
        <div key={index} className="flex items-center gap-4 mb-6">
          <div className="border border-purple-500 px-4 py-2 w-48 text-center font-semibold">
          Panel 200 mm 
          </div>
          <div className="border border-purple-500 px-4 py-2 w-48 text-center">
            {kickplateData.cutLengthPieces || 0} pcs
          </div>
          <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {set.pricePerSm}</div>
          <div className="border border-purple-500 px-4 py-2 w-32 text-center">Dhs {set.total.toFixed(2)}</div>
        </div>
      ))}

      {/* Trim Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-600 text-white font-semibold px-6 py-2 w-48 text-center">Trim 3 m</div>
        <div className="border border-purple-500 px-4 py-2 w-48 text-center">DEF: {totalTrim} pieces</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {trimRate}</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">Dhs {totalTrimCost.toFixed(2)}</div>
      </div>

      {/* Support Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-600 text-white font-semibold px-6 py-2 w-48 text-center">Support 3 m</div>
        <div className="border border-purple-500 px-4 py-2 w-48 text-center">PQR: {totalSupport} pieces</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">@ Dhs {supportRate}</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center">Dhs {totalSupportCost.toFixed(2)}</div>
      </div>

      {/* Totals */}
      <div className="flex items-center gap-4 mt-8">
        <div className="text-xl font-bold">G. Total:</div>
        <div className="border border-purple-500 px-4 py-2 w-32 text-center font-semibold">Dhs {grandTotal.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="text-xl font-bold">G. Total with VAT:</div>
        <div className="border border-purple-500 px-4 py-2 w-40 text-center font-semibold">Dhs {grandTotalWithVat.toFixed(2)}</div>
      </div>

      {/* Choose Delivery Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={() => navigate('/order/step9')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow text-lg font-semibold"
        >
          Choose Delivery
        </button>
      </div>
    </div>
  );
};

export default Step7_Preview_bill;
