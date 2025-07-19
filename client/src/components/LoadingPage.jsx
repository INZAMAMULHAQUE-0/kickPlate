import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.mp4';
import poster from '../assets/video-poster.jpg';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
        playPromise.catch(() => {
          videoRef.current.muted = true;
          videoRef.current.play();
        });
      }
    }
  }, []);

  // WhatsApp button click handler
  const handleWhatsappClick = () => {
    setShowWhatsapp(true);
    // Auto-close after 10 seconds
    setTimeout(() => setShowWhatsapp(false), 10000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
        >
          <source src={bg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white/5 backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">LOGO</span>
              </div>
              <h2 className="text-white font-bold text-base sm:text-xl">Company Name</h2>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md sm:max-w-2xl text-center backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/10 shadow-lg">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Company's <span className="text-amber-400">Tagline</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8">
              Follow-up text about your company's services
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base font-medium rounded shadow hover:shadow-md transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/order')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-amber-400 text-amber-100 hover:bg-amber-500/10 text-sm sm:text-base font-medium rounded transition"
              >
                Get Quotation
              </button>
            </div>
          </div>
        </main>

        {/* WhatsApp Floating Button */}
        <div 
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          onClick={handleWhatsappClick}
        >
          <div className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all animate-bounce">
            <FaWhatsapp className="text-2xl" />
          </div>
        </div>

        {/* WhatsApp Popup */}
        {showWhatsapp && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowWhatsapp(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              
              <div className="flex items-center mb-4">
                <FaWhatsapp className="text-green-500 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Contact Us on WhatsApp</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Our team is available to answer your questions. Click below to start chatting.
              </p>
              
              <a
                href="https://wa.me/917369960439"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white text-center py-3 px-6 rounded-lg font-medium transition"
              >
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-black/20 py-3 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Company Name
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;