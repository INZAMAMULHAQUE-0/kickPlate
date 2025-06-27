import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEnter = () => {
    if (username.trim().length < 3 || password.trim().length < 3) {
      setError('Username and Password must be at least 3 characters.');
      return;
    }
    // Proceed to order page or login logic
    navigate('/order');
  };

  // WhatsApp phone number (with country code, no + symbol)
  const whatsappNumber = '+919381581410'; 
  const whatsappMessage = `Hi, I'd like to register.`;

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5dc] p-4">
      <div className="bg-[#5c4033] text-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-[#f5f5dc] text-[#5c4033] placeholder-[#8b735b] focus:outline-none focus:ring-2 focus:ring-[#a67b5b]"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-[#f5f5dc] text-[#5c4033] placeholder-[#8b735b] focus:outline-none focus:ring-2 focus:ring-[#a67b5b]"
        />

        {error && (
          <p className="text-red-300 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleEnter}
          className="w-full bg-[#8b4513] hover:bg-[#7b3f00] text-white py-2 rounded transition duration-200"
        >
          Enter
        </button>

        <p className="text-sm text-center mt-4 text-[#f5f5dc]">
          1st Time? Register via:
        </p>

        <button
          onClick={handleWhatsApp}
          className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.04 2.002c-5.524.015-10.01 4.52-10.001 10.048.003 1.78.47 3.49 1.347 5.004L2.003 22l4.978-1.318A9.964 9.964 0 0 0 12.03 22c5.518 0 10.003-4.498 10.003-10.032-.002-5.51-4.482-9.966-9.993-9.966zm.004 1.999c4.418-.007 7.994 3.568 8.002 7.993.008 4.416-3.564 8.002-7.987 8.01a7.933 7.933 0 0 1-4.002-1.097l-.287-.168-2.948.782.789-2.894-.188-.297a7.928 7.928 0 0 1-1.117-4.03c-.005-4.417 3.567-7.997 8-8.003zm-2.676 4.477c-.107-.241-.215-.25-.313-.254-.083-.003-.179-.003-.275-.003-.095 0-.25.035-.38.18s-.498.487-.498 1.187.51 1.377.581 1.472c.07.095.996 1.58 2.41 2.15.336.145.598.23.802.294.337.107.644.093.887.056.27-.04.835-.341.952-.67.118-.33.118-.612.083-.67-.035-.06-.132-.096-.275-.168s-.835-.412-.965-.46c-.128-.05-.222-.07-.316.07s-.365.46-.448.555c-.082.095-.166.105-.31.035s-.61-.224-1.163-.715c-.43-.383-.719-.855-.803-.997-.084-.143-.009-.22.063-.29.065-.065.145-.168.217-.253.07-.084.095-.145.143-.24.048-.095.024-.18-.012-.253-.037-.072-.328-.814-.45-1.11z" />
          </svg>
          WhatsApp
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;