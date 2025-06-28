import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoIntro from './VideoIntro';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col">
      {/* NavBar */}
      <nav className="backdrop-blur-md bg-white/20 border-b border-white/30 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-[#5c4033] font-bold text-xl">Custom Alum Fab</h2>
          <div className="space-x-4">
            <button className="text-[#5c4033] hover:text-[#8b4513] font-medium transition">
              Home
            </button>
            <button className="text-[#5c4033] hover:text-[#8b4513] font-medium transition">
              Products
            </button>
            <button className="text-[#5c4033] hover:text-[#8b4513] font-medium transition">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-[#5c4033] mb-4">
          Welcome to Custom Alum Fab Factory, Dubai
        </h1>

        <p className="text-[#7c6a55] mb-6 max-w-xl">
          Premium aluminium solutions crafted with precision and care. Explore our range of custom products today.
        </p>

        <div className="w-full max-w-xl mb-6">
          <VideoIntro />
        </div>

        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-[#8b4513] text-white rounded-lg shadow hover:bg-[#7a3e00] transition"
        >
          Select Product &gt;
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
