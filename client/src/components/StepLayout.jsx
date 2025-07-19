import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';
import { CheckCircleIcon, MinusCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  { id: 'step1', path: '/order', label: 'Step 1: Model', shortLabel: '1' },
  { id: 'step2', path: '/order/step2', label: 'Step 2: Cut Length', shortLabel: '2' },
  { id: 'step3', path: '/order/step3', label: 'Step 3: Shed Length', shortLabel: '3' },
  { id: 'step4', path: '/order/step4', label: 'Step 4: Final Sizes', shortLabel: '4' },
  { id: 'step5', path: '/order/step5', label: 'Step 5: Preview', shortLabel: '5' },
  { id: 'step6', path: '/order/step6', label: 'Step 6: Select Colour', shortLabel: '6' },
  { id: 'step7', path: '/order/step7', label: 'Step 7: Billing Preview', shortLabel: '7' },
  { id: 'step8', path: '/order/step8', label: 'Step 8: Delivery Details', shortLabel: '8' }
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

  const currentIndex = steps.findIndex(step => 
    location.pathname === step.path || 
    (step.path !== '/order' && location.pathname.startsWith(step.path))
  );

  const getIcon = (index, id) => {
    if (index === currentIndex) {
      return <PlayCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 animate-pulse" />;
    }
    if (stepStatus[id]) {
      return <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 drop-shadow" />;
    }
    return <MinusCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
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
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#0f1e35] text-white">
      {/* Mobile Horizontal Navbar */}
      <div className="sm:hidden w-full overflow-x-auto bg-[#0f1e35]/90 backdrop-blur-md border-b border-[#2a3a5a] z-20">
        <div className="flex">
          {steps.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isComplete = stepStatus[step.id];
            const clickable = canNavigate(index, step.id);

            return (
              <div
                key={step.id}
                onClick={() => clickable && navigate(step.path)}
                className={`flex-shrink-0 flex flex-col items-center p-3 relative
                  ${
                    isCurrent
                      ? 'text-white bg-gradient-to-b from-blue-400/20 to-transparent border-b-2 border-blue-400'
                      : isComplete
                      ? 'text-green-300 hover:bg-[#1a2b4a]'
                      : 'text-gray-400 hover:bg-[#1a2b4a]'
                  }
                  ${!clickable && 'cursor-not-allowed opacity-60'}
                `}
              >
                <div className="relative">
                  {getIcon(index, step.id)}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-pulse"></div>
                  )}
                </div>
                <span className={`text-xs mt-1 ${isCurrent ? 'font-bold' : ''}`}>
                  {step.shortLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block w-64 p-6 sticky top-0 h-screen bg-[#0f1e35]/90 backdrop-blur-md border-r border-[#2a3a5a] shadow-xl z-20">
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
                      ? 'text-white bg-gradient-to-r from-blue-400/20 to-blue-400/10 border-l-4 border-blue-400 shadow-lg shadow-blue-400/20'
                      : isComplete
                      ? 'text-green-300 hover:bg-[#1a2b4a]'
                      : 'text-gray-400 hover:bg-[#1a2b4a]'
                  }
                  ${!clickable && 'cursor-not-allowed opacity-60'}
                  overflow-hidden
                `}
              >
                {isCurrent && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                )}
                
                {getIcon(index, step.id)}
                <span className={`text-sm font-medium truncate relative z-10 ${
                  isCurrent ? 'font-bold' : ''
                }`}>
                  {step.label}
                </span>
                
                {isCurrent && (
                  <div className="absolute inset-0 rounded-md bg-blue-400/10 animate-pulse"></div>
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleReset}
          className="w-full mt-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          Reset All
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0f1e35]/80 backdrop-blur-sm">
        {children}
      </main>
    </div>
  );
};

export default StepLayout;