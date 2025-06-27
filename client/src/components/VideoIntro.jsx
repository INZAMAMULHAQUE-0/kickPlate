import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoIntro = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-white text-xl">(Pre-video placeholder: product showcase)</p>
    </div>
  );
};

export default VideoIntro;