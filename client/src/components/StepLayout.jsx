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
      className="min-h-screen bg-background py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div className="mb-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">KickPlate Configuration</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Step {currentIndex + 1} of {steps.length} - {steps[currentIndex]?.title || ''}
          </p>
        </motion.div>

        {/* Modern style step progress bar */}
        <motion.div 
          className="mb-6 bg-white rounded-lg shadow p-4 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">Step {currentIndex + 1} of {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-blue-600"
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
                  <div className={`w-8 h-8 mx-auto rounded-full text-sm flex items-center justify-center font-semibold mb-2
                    ${isActive ? 'bg-orange-500 text-white' : isComplete ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}
                  `}>
                    {isActive ? idx + 1 : isComplete ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className="text-xs font-medium text-gray-900">{step.title}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1c1c2e] p-6 rounded-lg shadow"
        >
          <div className="hidden sm:block text-center text-xl font-semibold text-white mb-6">
            {steps[currentIndex]?.title}
          </div>
          {children}
        </motion.div>

        <motion.div 
          className="flex justify-between items-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border rounded text-white border-white disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          <div className="flex gap-4">
            {currentIndex < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepLayout;
