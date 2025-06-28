import React from 'react';
import { useLocation } from 'react-router-dom';
import { useKickplate } from '../context/KickplateContext';
import {
  Circle,
  CheckCircle2,
  Dot,
} from 'lucide-react'; // ✅ Lucide icons

const steps = [
  { id: 'step1', path: '/order', label: 'Step 1: Model & Width' },
  { id: 'step2', path: '/order/step2', label: 'Step 2: Cut Length' },
  { id: 'step3', path: '/order/step3', label: 'Step 3: Shed Length' },
];

const StepLayout = ({ children }) => {
  const location = useLocation();
  const { stepStatus } = useKickplate();

  const currentIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );

  const getIcon = (index, id) => {
    if (stepStatus[id]) return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (index === currentIndex) return <Dot className="w-5 h-5 text-blue-600" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5dc]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#e9e6d2] border-r border-gray-300 p-6">
        <h2 className="text-xl font-bold text-[#5c4033] mb-6">Progress</h2>
        <ul className="space-y-3">
          {steps.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isComplete = stepStatus[step.id];

            return (
              <li
                key={step.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
                  ${isComplete ? 'text-green-700' : isCurrent ? 'bg-blue-100 border border-blue-300 text-blue-700' : 'text-gray-500'}
                `}
              >
                {getIcon(index, step.id)}
                <span className="text-sm font-medium">{step.label}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Step Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default StepLayout;
