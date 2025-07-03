import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';

import {
  CheckCircleIcon,
  MinusCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';

const steps = [
  { id: 'step1', path: '/order', label: 'Step 1: Model' },
  { id: 'step2', path: '/order/step2', label: 'Step 2: Cut Length' },
  { id: 'step3', path: '/order/step3', label: 'Step 3: Shed Length' },
  { id: 'step4', path: '/order/step4', label: 'Step 4: Final Sizes' },
  { id: 'step5', path: '/order/step5', label: 'Step 5: Preview' },
  { id: 'step6', path: '/order/step6', label: 'Step 6: Select Colour' },
  { id: 'step7', path: '/order/step7', label: 'Step 7: Billing Preview' },
  { id: 'step8', path: '/order/step8', label: 'Step 8: Delivery Details' }
];

const StepLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    stepStatus,
    setStepStatus,
    setKickplateData,
    setAllSets,
    setSelectedColour
  } = useKickplate();

  // Updated path matching logic
  const currentIndex = steps.findIndex(step => 
    location.pathname === step.path || 
    (step.path !== '/order' && location.pathname.startsWith(step.path))
  );

  const getIcon = (index, id) => {
    if (index === currentIndex) {
      return <PlayCircleIcon className="w-5 h-5 text-yellow-400 animate-pulse" />;
    }
    if (stepStatus[id]) {
      return <CheckCircleIcon className="w-5 h-5 text-lime-400 drop-shadow" />;
    }
    return <MinusCircleIcon className="w-5 h-5 text-gray-500" />;
  };

  const canNavigate = (index, id) => {
    return stepStatus[id] || index <= currentIndex;
  };

  const handleReset = () => {
    setKickplateData({
      model: 'Closed Joint',
      cutLength: '200',
      cutLengthUnit: 'mm',
      shedLength: '',
      shedLengthUnit: 'mm',
      trimLengthPieces: '',
      supportLengthPieces: '',
      cutLengthPieces: ''
    });

    setStepStatus({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false
    });

    setAllSets([]);
    setSelectedColour(null);

    localStorage.removeItem('kickplateData');
    localStorage.removeItem('stepStatus');
    localStorage.removeItem('allSets');
    localStorage.removeItem('selectedColour');

    navigate('/order');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 sticky top-0 h-screen bg-white/10 backdrop-blur-md border-r border-white/10 shadow-xl z-20 rounded-r-xl">
        <h2 className="text-xl font-bold text-white mb-6 tracking-wide">🧭 Steps</h2>

        <ul className="space-y-3 mb-10">
          {steps.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isComplete = stepStatus[step.id];
            const clickable = canNavigate(index, step.id);

            return (
              <li
                key={step.id}
                onClick={() => clickable && navigate(step.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition cursor-pointer relative
                  ${
                    isCurrent
                      ? 'text-white bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 border-l-4 border-yellow-400 shadow-lg shadow-yellow-400/20'
                      : isComplete
                      ? 'text-lime-300 hover:bg-white/10'
                      : 'text-gray-400 hover:bg-white/5'
                  }
                  ${!clickable && 'cursor-not-allowed opacity-60'}
                  overflow-hidden
                `}
              >
                {isCurrent && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                )}
                
                {getIcon(index, step.id)}
                <span className={`text-sm font-medium truncate relative z-10 ${
                  isCurrent ? 'font-bold' : ''
                }`}>
                  {step.label}
                </span>
                
                {isCurrent && (
                  <div className="absolute inset-0 rounded-md bg-yellow-400/10 animate-pulse"></div>
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleReset}
          className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Reset All
        </button>
      </aside>

      {/* Main Step Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-black/10 backdrop-blur-sm">
        {children}
      </main>
    </div>
  );
};

export default StepLayout;