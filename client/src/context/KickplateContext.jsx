import React, { createContext, useContext, useState, useEffect } from 'react';

const KickplateContext = createContext();

export const KickplateProvider = ({ children }) => {
  // Load from localStorage (or fallback)
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [kickplateData, setKickplateData] = useState(() =>
    loadFromLocalStorage('kickplateData', {
      model: 'Closed Joint',
      width: '200',
      widthUnit: 'mm',
      cutLength: '200',
      cutLengthUnit: 'mm',
      shedLength: '',
      shedLengthUnit: 'mm',
      trimLengthPieces: '',
      supportLengthPieces: '',
      cutLengthPieces: ''
    })
  );

  const [stepStatus, setStepStatus] = useState(() =>
    loadFromLocalStorage('stepStatus', {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false
    })
  );

  const [allSets, setAllSets] = useState(() =>
    loadFromLocalStorage('allSets', [])
  );

  const [selectedColour, setSelectedColour] = useState(() =>
    loadFromLocalStorage('selectedColour', null)
  );

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('kickplateData', JSON.stringify(kickplateData));
  }, [kickplateData]);

  useEffect(() => {
    localStorage.setItem('stepStatus', JSON.stringify(stepStatus));
  }, [stepStatus]);

  useEffect(() => {
    localStorage.setItem('allSets', JSON.stringify(allSets));
  }, [allSets]);

  useEffect(() => {
    localStorage.setItem('selectedColour', JSON.stringify(selectedColour));
  }, [selectedColour]);

  // Add a new set and reset current state
  const addNewSet = () => {
    setAllSets(prev => [...prev, kickplateData]);

    setKickplateData({
      model: 'default',
      width: '200',
      widthUnit: 'mm',
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
      step6: false,
      step7: false,
      step8: false
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
