import React, { createContext, useContext, useState } from 'react';

const KickplateContext = createContext();

export const KickplateProvider = ({ children }) => {
  const [kickplateData, setKickplateData] = useState({
    width: '',
    widthUnit: 'cm',
    model: 'default',
    cutLength: '',
    cutLengthUnit: 'cm',
    shedLength: '',
    shedLengthUnit: 'cm',
  });

  return (
    <KickplateContext.Provider value={{ kickplateData, setKickplateData }}>
      {children}
    </KickplateContext.Provider>
  );
};

export const useKickplate = () => useContext(KickplateContext);