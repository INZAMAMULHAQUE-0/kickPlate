import React, { createContext, useContext, useState } from 'react';

const KickplateContext = createContext();

export const KickplateProvider = ({ children }) => {
  const [kickplateData, setKickplateData] = useState({
    model: 'Closed Joint',
    cutLength: '200',
    cutLengthUnit: 'mm',
    shedLength: '',
    shedLengthUnit: 'mm',
    trimLengthPieces: '',
    supportLengthPieces: '',
    cutLengthPieces: ''
  });

  const [stepStatus, setStepStatus] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false
  });

  const [allSets, setAllSets] = useState([]);

  const [selectedColour, setSelectedColour] = useState(null);

  const addNewSet = () => {
    setAllSets(prev => [...prev, kickplateData]);

    setKickplateData({
      model: 'default',
      cutLength: '200',
      cutLengthUnit: 'mm',
      shedLength: '',
      shedLengthUnit: 'mm',
      trimLengthPieces: '',
      supportLengthPieces: '',
      cutLengthPieces: ''
    });

    setStepStatus({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false
    });

    console.log('New set added:', kickplateData);
  };

  return (
    <KickplateContext.Provider
      value={{
        kickplateData,
        setKickplateData,
        stepStatus,
        setStepStatus,
        allSets,
        setAllSets,
        addNewSet,
        selectedColour,
        setSelectedColour
      }}
    >
      {children}
    </KickplateContext.Provider>
  );
};

export const useKickplate = () => useContext(KickplateContext);
