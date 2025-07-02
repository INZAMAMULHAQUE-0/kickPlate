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
    cutLengthPieces: '',
    selectedColour: null
  });

  const [stepStatus, setStepStatus] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false
  });

  // 🧠 All completed sets of configurations
  const [allSets, setAllSets] = useState([]);

  // ➕ Add current set to allSets & reset for new input
  const addNewSet = () => {
    // Store current filled set
    setAllSets(prev => [...prev, kickplateData]);

    // Reset to start fresh
    setKickplateData({
      model: 'default',
      cutLength: '200',
      cutLengthUnit: 'mm',
      shedLength: '',
      shedLengthUnit: 'mm',
      trimLengthPieces: '',
      supportLengthPieces: '',
      cutLengthPieces: '',
      selectedColour: null
    });

    // Reset step status too
    setStepStatus({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false
    });

    console.log('Added to allSets:', [...allSets, kickplateData]);
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
        addNewSet
      }}
    >
      {children}
    </KickplateContext.Provider>
  );
};

export const useKickplate = () => useContext(KickplateContext);
