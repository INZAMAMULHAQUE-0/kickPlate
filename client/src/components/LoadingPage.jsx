import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoIntro from './VideoIntro';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f3e6] to-[#f5e9d3]">
      {/* NavBar */}
      <nav className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CAF</span>
            </div>
            <h2 className="text-[#3a2c21] font-bold text-xl">Custom Alum Fab</h2>
          </div>
          <div className="hidden md:flex space-x-8">
            <button className="text-[#3a2c21] hover:text-amber-700 font-medium transition duration-300">Home</button>
            <button className="text-[#3a2c21] hover:text-amber-700 font-medium transition duration-300">Products</button>
            <button className="text-[#3a2c21] hover:text-amber-700 font-medium transition duration-300">Gallery</button>
            <button className="text-[#3a2c21] hover:text-amber-700 font-medium transition duration-300">Contact</button>
          </div>
          <button 
            onClick={() => navigate('/order')}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-md transition duration-300"
          >
            Get Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a2c21] mb-6">
          Precision <span className="text-amber-600">Aluminium</span> Solutions
        </h1>
        <p className="text-lg md:text-xl text-[#5c4a36] max-w-2xl mb-10">
          Custom fabrication with German engineering precision and Emirati craftsmanship
        </p>
        
        <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-xl mb-12">
          <VideoIntro />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/order')}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Instant Quote
          </button>
          <button className="px-8 py-3 border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-semibold rounded-lg transition-all duration-300" onClick={() => navigate('/login')}>
            Make Order
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white/30 rounded-2xl shadow-inner my-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#3a2c21] mb-2">Fast Turnaround</h3>
            <p className="text-[#5c4a36]">72-hour standard delivery for most custom orders</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#3a2c21] mb-2">Premium Materials</h3>
            <p className="text-[#5c4a36]">Aerospace-grade aluminium with 10-year warranty</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#3a2c21] mb-2">Quality Assurance</h3>
            <p className="text-[#5c4a36]">Every product undergoes 12-point inspection</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3a2c21] mb-6">Ready to Start Your Project?</h2>
        <p className="text-lg text-[#5c4a36] max-w-2xl mx-auto mb-8">
          Get a free consultation and quote for your custom aluminium needs
        </p>
        <button
          onClick={() => navigate('/order')}
          className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Begin Your Order
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#3a2c21] text-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Custom Alum Fab</h3>
              <p className="text-amber-100 mb-2">Industrial Area 12</p>
              <p className="text-amber-100 mb-4">Dubai, UAE</p>
              <p className="text-amber-100">+971 4 123 4567</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block hover:text-amber-300 transition">Home</a>
                <a href="#" className="block hover:text-amber-300 transition">Products</a>
                <a href="#" className="block hover:text-amber-300 transition">Gallery</a>
                <a href="#" className="block hover:text-amber-300 transition">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block hover:text-amber-300 transition">Terms of Service</a>
                <a href="#" className="block hover:text-amber-300 transition">Privacy Policy</a>
                <a href="#" className="block hover:text-amber-300 transition">Warranty</a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-100">
            © {new Date().getFullYear()} Custom Alum Fab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;