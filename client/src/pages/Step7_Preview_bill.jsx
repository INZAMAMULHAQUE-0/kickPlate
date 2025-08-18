import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKickplate } from '../context/KickplateContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, FileText } from "lucide-react";

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
    const pieces = Number(set.cutLengthPieces || 0);
    const area = cutLen * getAreaPerPiece * pieces;
    const total = area * panelRate;

    return {
      label: `Panel ${set.cutLength} mm`,
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

  // Format currency display
  const formatCurrency = (amount) => {
    return `AED ${amount.toFixed(2)}`;
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white flex flex-col items-center px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-5xl text-center mb-1 sm:mb-10">
        <div className="bg-indigo-100/60 inline-block px-6 py-2 rounded-full mb-4 shadow border border-indigo-200">
          <span className="text-xs sm:text-sm text-black tracking-wide font-extrabold">Step 7 of 8</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">Order Preview</h1>
        <p className="text-black text-base sm:text-lg mt-2">Review your complete order details and pricing</p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl space-y-6">
        
        {/* Selected Colour Preview */}
        {selectedColour && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-extrabold text-black mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Selected Specification
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className={`w-full sm:w-48 h-20 ${selectedColour.color} text-white rounded-lg shadow-md flex items-center justify-center`}
              >
                <span className="text-xl font-extrabold">{selectedColour.thickness}</span>
              </div>
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 block">Lead Time</span>
                  <span className="font-semibold text-black">{selectedColour.leadTime}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Panel Rate</span>
                  <span className="font-semibold text-black">AED {selectedColour.price}/sm</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Trim Rate</span>
                  <span className="font-semibold text-black">AED {trimRate}/pc</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Support Rate</span>
                  <span className="font-semibold text-black">AED {supportRate}/pc</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Details */}
        <div className="bg-white/80 border-2 border-indigo-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Order Details
          </h3>

          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-4 mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="font-semibold text-black">Item</div>
            <div className="font-semibold text-black text-center">Quantity</div>
            <div className="font-semibold text-black text-center">Rate</div>
            <div className="font-semibold text-black text-center">Total</div>
          </div>

          {/* Panel Rows */}
          <div className="space-y-3 mb-6">
            {panelRows.map((row, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-indigo-50/50 border border-indigo-200 rounded-lg"
              >
                <div className="font-medium text-black">
                  <span className="sm:hidden text-gray-600 text-sm">Item: </span>
                  {row.label}
                </div>
                <div className="text-center">
                  <span className="sm:hidden text-gray-600 text-sm">Quantity: </span>
                  <span className="font-medium">{row.pieces} pieces = {row.area.toFixed(2)} sm</span>
                </div>
                <div className="text-center">
                  <span className="sm:hidden text-gray-600 text-sm">Rate: </span>
                  <span className="font-medium">AED {row.rate}</span>
                </div>
                <div className="text-center">
                  <span className="sm:hidden text-gray-600 text-sm">Total: </span>
                  <span className="font-bold text-black">{formatCurrency(row.total)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trim and Support */}
      <div className="space-y-3 mb-6">
            {/* Trim */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: panelRows.length * 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-green-50/50 border border-green-200 rounded-lg"
            >
              <div className="font-medium text-black">
                <span className="sm:hidden text-gray-600 text-sm">Item: </span>
                Trim 3m
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Quantity: </span>
                <span className="font-medium">{totalTrim} pieces</span>
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Rate: </span>
                <span className="font-medium">AED {trimRate}</span>
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Total: </span>
                <span className="font-bold text-black">{formatCurrency(totalTrimCost)}</span>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (panelRows.length + 1) * 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-green-50/50 border border-green-200 rounded-lg"
            >
              <div className="font-medium text-black">
                <span className="sm:hidden text-gray-600 text-sm">Item: </span>
                Support 3m
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Quantity: </span>
                <span className="font-medium">{totalSupport} pieces</span>
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Rate: </span>
                <span className="font-medium">AED {supportRate}</span>
              </div>
              <div className="text-center">
                <span className="sm:hidden text-gray-600 text-sm">Total: </span>
                <span className="font-bold text-black">{formatCurrency(totalSupportCost)}</span>
              </div>
            </motion.div>
          </div>

          {/* Totals Section */}
          <div className="border-t-2 border-indigo-200 pt-6 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg"
            >
              <span className="text-lg font-semibold text-black flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                Subtotal:
              </span>
              <span className="text-xl font-bold text-black">{formatCurrency(grandTotal)}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between items-center p-4 bg-indigo-100 rounded-lg border-2 border-indigo-300"
            >
              <span className="text-xl font-extrabold text-black">Grand Total (incl. 5% VAT):</span>
              <span className="text-2xl font-extrabold text-indigo-700">{formatCurrency(grandTotalWithVat)}</span>
            </motion.div>
          </div>
        </div>

        {/* Continue Button */}
    <div className="flex justify-end">
          <button
            onClick={() => {
              setStepStatus(prev => ({ ...prev, step7: true }));
              navigate('/order/step9');
            }}
      className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-200 text-lg font-extrabold tracking-wide bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700"
          >
            Choose Delivery
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step7_Preview_bill;
