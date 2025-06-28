import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Step1_SelectModel from './Step1_SelectModel';
import Step2_CutLength from './Step2_CutLength';
import Step3_ShedLength from './Step3_ShedLength';
import StepLayout from '../components/StepLayout';

const OrderFlow = () => (
  <StepLayout>
    <Routes>
      <Route path="/" element={<Step1_SelectModel />} />
      <Route path="/step2" element={<Step2_CutLength />} />
      <Route path="/step3" element={<Step3_ShedLength />} />
    </Routes>
  </StepLayout>
);

export default OrderFlow;
