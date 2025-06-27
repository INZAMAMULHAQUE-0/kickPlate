import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LoadingPage';
import VideoIntro from './components/VideoIntro';
import LoginRegister from './components/LoginRegister';
import OrderFlow from './pages/OrderFlow';

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/intro" element={<VideoIntro />} />
    <Route path="/login" element={<LoginRegister />} />
    <Route path="/order/*" element={<OrderFlow />} />
  </Routes>
);

export default App;
