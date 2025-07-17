import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.mp4';
import bgMobile from '../assets/bg.mp4'; // Add a mobile-optimized video
import poster from '../assets/video-poster.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices and landscape mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                window.matchMedia("(orientation: landscape)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Video autoplay handling
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Fallback for browsers that block autoplay
          videoRef.current.muted = true;
          videoRef.current.play();
        });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Responsive Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
          disablePictureInPicture
          preload="auto"
          key={isMobile ? 'mobile' : 'desktop'}
        >
          <source 
            src={isMobile ? bgMobile : bg} 
            type="video/mp4" 
          />
          Your browser does not support HTML5 video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
      </div>

      {/* Content Overlay - Mobile Optimized */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">CAF</span>
              </div>
              <h2 className="text-white font-bold text-base sm:text-xl">Custom Alum Fab</h2>
            </div>
            <button 
              onClick={() => navigate('/order')}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm rounded shadow-sm transition"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md sm:max-w-2xl text-center backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/10 shadow-lg">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Precision <span className="text-amber-400">Aluminium</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8">
              Enterprise-grade fabrication ready in minutes
            </p>

            {/* Buttons Stacked on Mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <button
                onClick={() => navigate('/order')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base font-medium rounded shadow hover:shadow-md transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-amber-400 text-amber-100 hover:bg-amber-500/10 text-sm sm:text-base font-medium rounded transition"
              >
                WhatsApp
              </button>
            </div>

            {/* Trust Indicators - Adjusted for Mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12">
              {[
                { icon: '🏭', text: '15+ Years' },
                { icon: '🇩🇪', text: 'German Tech' },
                { icon: '✨', text: '500+ Projects' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-2 sm:p-3 backdrop-blur-sm bg-white/5 rounded border border-white/10"
                >
                  <span className="text-xl sm:text-2xl block mb-1">{item.icon}</span>
                  <p className="text-xs sm:text-sm text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="bg-black/20 py-3 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Custom Alum Fab
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;