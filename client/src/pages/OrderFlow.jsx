import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Step1_SelectModel from './Step1_SelectModel';
import Step2_CutLength from './Step2_CutLength';
import Step3_ShedLength from './Step3_ShedLength';
import StepLayout from '../components/StepLayout';
import Step4_FinalSizes from './Step4_FinalSizes';
import Step5_Preview from './Step5_Preview';
import Step6_SelectColour from './Step6_SelectColour';

const OrderFlow = () => (
  <StepLayout>
    <Routes>
      <Route path="/" element={<Step1_SelectModel />} />
      <Route path="/step2" element={<Step2_CutLength />} />
      <Route path="/step3" element={<Step3_ShedLength />} />
      <Route path="/step4" element={<Step4_FinalSizes />} />
      <Route path="/step5" element={<Step5_Preview/>} />
      <Route path="/step6" element={<Step6_SelectColour/>} />
    </Routes>
  </StepLayout>
);

export default OrderFlow;