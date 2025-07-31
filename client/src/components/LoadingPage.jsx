import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.mp4';
import poster from '../assets/video-poster.jpg';
import { FaWhatsapp } from 'react-icons/fa';

// Add custom animations
import { motion } from 'framer-motion';

const LandingPage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoRef.current.muted = true;
          videoRef.current.play();
        });
      }
    }
  }, []);

  return (
    <>
      <div className="h-screen w-full flex flex-col bg-white via-orange-50 to-orange-100 text-gray-800 relative overflow-hidden">
        {/* Cursor-following color effect (desktop only) */}
        <div
          className="pointer-events-none fixed z-0 hidden md:block"
          style={{
            left: cursor.x - 120,
            top: cursor.y - 120,
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, #FFD580 0%, #FFA726 60%, transparent 100%)',
            opacity: 0.18,
            filter: 'blur(32px)',
            borderRadius: '50%',
            transition: 'left 0.18s cubic-bezier(.4,1,.7,1), top 0.18s cubic-bezier(.4,1,.7,1)',
          }}
        />
        {/* Design Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-orange-300/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400/10 to-orange-200/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-5 bg-white/80 hover:bg-white/95 transition-all duration-300 shadow-none hover:shadow-md border-b border-orange-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
                K
              </div>
              <h1 className="text-gray-800 font-bold text-xl sm:text-2xl tracking-tight">KickPlate</h1>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 w-full flex items-center justify-center px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl w-full gap-8 lg:gap-16">
            {/* Left: Text & Buttons */}
            <div className="max-w-xl text-center lg:text-left pt-8 lg:pt-0">
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Premium Quality
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">KickPlate</span> Solutions
              </h2>
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">
                Custom Designs in Dubai
              </h4>
              <p className="hidden sm:block text-base sm:text-lg text-gray-500 mb-8 max-w-lg">
                High-quality, custom-made kickplate solutions that perfectly match your specifications and requirements.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start justify-center lg:justify-start mb-8">
                <button
                  onClick={() => navigate('/order')}
                  className=" w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-medium px-8 py-3.5 rounded-full shadow-sm border border-orange-200 transition-all duration-300 w-full sm:w-auto hover:bg-orange-500 hover:text-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Get a Quotation
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className=" w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-medium px-8 py-3.5 rounded-full shadow-sm border border-orange-200 transition-all duration-300 w-full sm:w-auto hover:bg-orange-500 hover:text-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <span>Login</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Floating WhatsApp Button for all screens */}
              <button
                onClick={() => setShowWhatsapp(true)}
                className="fixed z-40 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp className="text-2xl" />
              </button>
            </div>

            {/* Right: Video */}
            <div className="w-full max-w-xl lg:max-w-2xl rounded-2xl overflow-hidden shadow-xl bg-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-300/20 mix-blend-overlay z-10"></div>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
                className="w-full h-[220px] sm:h-[360px] lg:h-[480px] object-cover"
              >
                <source src={bg} type="video/mp4" />
              </video>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm py-4 text-gray-500 relative z-10">
          © {new Date().getFullYear()} KickPlate. All rights reserved.
        </footer>

        {/* WhatsApp Modal */}
        {showWhatsapp && (
          <div className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center px-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative text-gray-800 animate-scaleIn">
              <button
                onClick={() => setShowWhatsapp(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center mb-6">
                <div className="bg-green-500/10 p-3 rounded-full mr-4">
                  <FaWhatsapp className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Connect with Our Team</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Our support team is available on WhatsApp to answer all your questions about our kickplate solutions.
              </p>
              <a
                href="https://wa.me/917369960439"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-300"
              >
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
