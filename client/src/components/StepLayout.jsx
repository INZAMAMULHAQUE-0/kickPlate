import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { id: 'step1', path: '/order', title: 'Model Selection', description: '' },
  { id: 'step2', path: '/order/step2', title: 'Cut Length', description: 'Enter cut length details' },
  { id: 'step3', path: '/order/step3', title: 'Shed Length', description: 'Specify shed/panel length' },
  { id: 'step4', path: '/order/step4', title: 'Final Sizes', description: 'Confirm final size measurements' },
  { id: 'step5', path: '/order/step5', title: 'Preview', description: 'Preview the panel setup' },
  { id: 'step6', path: '/order/step6', title: 'Select Colour', description: 'Pick color and view rate' },
  { id: 'step7', path: '/order/step7', title: 'Billing Preview', description: 'Review cost and breakdown' },
  { id: 'step8', path: '/order/step8', title: 'Delivery Details', description: 'Enter address and instructions' },
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

  const handleHomeClick = () => {
    navigate('/');
  };

  const currentIndex = steps.findIndex(step => 
    location.pathname === step.path || 
    (step.path !== '/order' && location.pathname.startsWith(step.path))
  );

  const progress = ((currentIndex) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
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

    localStorage.clear();
    navigate('/order');
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header spacing */}
        <div className="mb-3 sm:mb-4" />
        {/* Mobile progress bar */}
        <motion.div 
          className="mb-4 backdrop-blur-md bg-white/90 rounded-lg shadow-lg p-3 block sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-extrabold text-gray-900">Step {currentIndex + 1} of {steps.length}</span>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleHomeClick}
                className="backdrop-blur-md bg-white/30 hover:bg-white/40 text-gray-800 px-3 py-1.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-sm">Home</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
              <button
                onClick={handleReset}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all duration-300"
                title="Reset"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          {/* Scrollable steps for mobile */}
          <div className="relative">
            <div 
              className="flex overflow-x-auto gap-2 pb-2" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
              {steps.map((step, idx) => {
                const isComplete = stepStatus[step.id];
                const isActive = idx === currentIndex;
                const canNavigate = isComplete || idx <= currentIndex;
                return (
                  <div 
                    key={step.id} 
                    className="flex-shrink-0 cursor-pointer flex flex-col items-center min-w-[60px]" 
                    onClick={() => canNavigate && navigate(step.path)}
                  >
                    <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-extrabold mb-1
                      ${isActive ? 'bg-blue-900 text-white' : isComplete ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {isActive ? idx + 1 : isComplete ? <CheckCircle className="w-3 h-3" /> : idx + 1}
                    </div>
                    <div className={`text-xs text-center leading-tight px-1 ${isActive ? 'text-blue-900 font-bold' : 'text-gray-700'}`}>
                      {step.title.split(' ').map((word, i) => (
                        <div key={i}>{word}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Desktop step progress bar */}
        <motion.div 
          className="mb-6 bg-gradient-to-br from-gray-100 via-white to-white rounded-lg shadow p-4 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-extrabold text-gray-900">Step {currentIndex + 1} of {steps.length}</span>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleHomeClick}
                className="backdrop-blur-md bg-white/30 hover:bg-white/40 text-gray-800 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all duration-300"
                title="Reset"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-blue-900"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex justify-between text-center">
            {steps.map((step, idx) => {
              const isComplete = stepStatus[step.id];
              const isActive = idx === currentIndex;
              const canNavigate = isComplete || idx <= currentIndex;
              return (
                <div key={step.id} className="flex-1 cursor-pointer" onClick={() => canNavigate && navigate(step.path)}>
                  <div className={`w-8 h-8 mx-auto rounded-full text-sm flex items-center justify-center font-extrabold mb-2
                    ${isActive ? 'bg-blue-900 text-white' : isComplete ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {isActive ? idx + 1 : isComplete ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className={`text-xs font-bold ${isActive ? 'text-blue-900' : 'text-gray-700'} px-1`}>{step.title}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-gray-50 via-white to-white rounded-lg shadow"
        >
          {children}
        </motion.div>

        <motion.div 
          className="mt-4 sm:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-end">
            <button
              onClick={handleNext}
              className="hidden"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepLayout;
