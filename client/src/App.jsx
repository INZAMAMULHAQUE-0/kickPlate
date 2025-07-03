import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LoadingPage';
import LoginRegister from './components/LoginRegister';
import OrderFlow from './pages/OrderFlow';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/order/*" element={<OrderFlow />} />
      </Routes>
      <h1>website isn't live.Just discovering the flow, not the final look!!</h1>
    </>
  );
};

export default App;
