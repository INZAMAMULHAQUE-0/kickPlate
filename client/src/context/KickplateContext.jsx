import React, { createContext, useContext, useState } from 'react';

const KickplateContext = createContext();

export const KickplateProvider = ({ children }) => {
  const [kickplateData, setKickplateData] = useState({
    model: 'default',
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
    step4: false
  });

  const [allKickplateSets, setAllKickplateSets] = useState([]);

  const addNewSet = () => {
    setAllKickplateSets(prev => {
      const updatedSets = [...prev, kickplateData];
      console.log('✅ Stored Sets:', updatedSets); // Logging all sets
      return updatedSets;
    });

    // Reset form data
    setKickplateData({
      model: 'Closed joint',
      cutLength: '200',
      cutLengthUnit: 'mm',
      shedLength: '',
      shedLengthUnit: 'mm',
      trimLengthPieces: '',
      supportLengthPieces: '',
      cutLengthPieces: ''
    });

    // Optionally reset steps too
    setStepStatus({
      step1: false,
      step2: false,
      step3: false,
      step4: false
    });
  };

  return (
    <KickplateContext.Provider
      value={{
        kickplateData,
        setKickplateData,
        stepStatus,
        setStepStatus,
        allKickplateSets,
        addNewSet
      }}
    >
      {children}
    </KickplateContext.Provider>
  );
};

export const useKickplate = () => useContext(KickplateContext);
