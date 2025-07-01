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
    trimLengthPieces: '',    
  supportLengthPieces: '',
  cutLenghtPieces:''
  });

  const [stepStatus, setStepStatus] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  return (
    <KickplateContext.Provider
      value={{
        kickplateData,
        setKickplateData,
        stepStatus,
        setStepStatus,
      }}
    >
      {children}
    </KickplateContext.Provider>
  );
};

export const useKickplate = () => useContext(KickplateContext);
